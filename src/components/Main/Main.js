import React, {useState, useEffect, useRef} from 'react'
import {MainWrapper, MainHeader, MainHeaderInfo, MainHeaderIcons, MainContent, Message, MessageContent, OwnMessage } from './MainComps'
import { Avatar, IconButton } from '@material-ui/core';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import db from '../../services/firebase'
import {useSelector, useDispatch} from 'react-redux'
import {useParams, } from 'react-router-dom'
import {selectUser, logout } from '../../features/user/userSlice'
import Footer from './Footer'
import { useConfirm } from 'material-ui-confirm';
import {https, http} from '../../Helpers/Links'
function Main() {
    const currentUser = useSelector(selectUser);
    const [random, setRandom] = useState('');
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [messagesCopy, setMessagesCopy] = useState([])
    const [randomChat, setRandomChat] = useState('')
    const [roomName, setRoomName] = useState('');
    const messageEndRef = useRef(null);
    const dispatch = useDispatch();
    const confirm = useConfirm();

    useEffect(() =>{
        if(roomId) {
            const sub1 = db.collection('rooms').doc(roomId)
            .onSnapshot(snapshot => (
            setRoomName(snapshot.data().name)));
            return () => sub1();
        }    
        
    }, [roomId]);

    useEffect(() =>{
        const sub2 = db.collection('rooms').doc(roomId)
        .collection('messages').orderBy('timestamp','asc')
        .onSnapshot(snapshot => (
        setMessages(snapshot.docs.map(doc => doc.data())),
        setMessagesCopy(snapshot.docs.map(doc => doc.data()))
        ));
        return () => sub2();

    }, [roomId]);

    const logOut = () =>{
        confirm({description: 'You want to log out?'})
        .then(() => dispatch(logout()))
        .catch(() => null)
    }
    useEffect(() =>{
        setRandom(Math.floor(Math.random() * 3000 ));
        setRandomChat(Math.floor(Math.random() * 3000 ))

    },[roomId])

    const scrollToBottom = () => {
        if(messageEndRef){
        messageEndRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        }
        else return
     }
    useEffect(scrollToBottom, [messages]);
    const searchMessage = () =>{
        let message = prompt('Look for message...');
       
        if(message){
            message = message.toLowerCase();
            if(messages.filter(msg => (msg.message).toLowerCase() === message)){
                const filtered = messages.filter(msg => (msg.message).toLowerCase() === message);
                    if(filtered.length > 0 ) setMessages(filtered);
                    else {
                        alert('Message not found')
                        setMessages(messagesCopy)
                    }
                }
            else{
                return null, setMessages(messagesCopy)
            }
        }
        else{
            return null, setMessages(messagesCopy), alert('Message not found')
        }
    }
    const handleLinks = (message) =>{
        if(message.includes(https) || message.includes(http)){
             return true
        }
        else{
            return false
        }
    }

    return (
        <MainWrapper>
            <MainHeader>
                <Avatar src={`https://avatars.dicebear.com/api/human/${random}.svg`} />
                <MainHeaderInfo>
                    <h3>{roomName}</h3>
                    <p>
                        {
                            (messages[messages.length-1]) ?
                        <span>{new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</span>
                            :
                            <span>Empty room</span>
                        }    

                    </p>
                </MainHeaderInfo>
                <MainHeaderIcons>
                    <IconButton onClick={searchMessage}>
                        <SearchIcon />
                    </IconButton>
                    <input type="file" id="sampleFile" style={{display:'none'}} />
                    <IconButton htmlFor="sampleFile" component="label">
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton onClick={logOut}>
                        <ExitToAppTwoToneIcon />
                    </IconButton>
                </MainHeaderIcons>
            </MainHeader>
            <MainContent >
            <>
            {messages.map(message => {
                if(message.email === currentUser.email){
                    return( 
                        <OwnMessage key={message.timestamp}>
                            <MessageContent >
                                {handleLinks(message.message) ? <a href={message.message} target="_blank" rel="noopener noreferrer">{message.message}</a> : message.message}
                                <span>{message.author}</span>
                            </MessageContent>
                            <Avatar src={`${currentUser.photo}`}/>
                        </OwnMessage>)
                    }
                else{
                    return(
                    <Message key={message.timestamp}>
                        <Avatar src={`https://avatars.dicebear.com/api/human/${randomChat}.svg`}/>
                        <MessageContent >
                        {handleLinks(message.message) ? <a href={message.message} target="_blank" rel="noopener noreferrer">{message.message}</a> : message.message}
                            <span>{message.author}</span>
                        </MessageContent>
                    </Message>
                    )
                    }
                }
            )
            }
            </>
            <div ref={messageEndRef}></div>
            </MainContent>
            <Footer />
        </MainWrapper>
    )
}

export default Main
