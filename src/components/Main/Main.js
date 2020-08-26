import React, {useState, useEffect, useRef} from 'react'
import {MainWrapper, MainHeader, MainHeaderInfo, MainHeaderIcons, MainContent, Message, MessageContent, OwnMessage } from './MainComps'
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import db from '../../services/firebase'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {selectUser} from '../../features/user/userSlice'
import Footer from './Footer'

function Main() {
    const currentUser = useSelector(selectUser);
    const [random, setRandom] = useState('');
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [randomChat, setRandomChat] = useState('')
    const [roomName, setRoomName] = useState('');
    const messageEndRef = useRef(null);
    const [lastMessage, setLastMessage] = useState('')
    useEffect(() =>{
        if(roomId) {
            db.collection('rooms').doc(roomId)
            .onSnapshot(snapshot => (
            setRoomName(snapshot.data().name)));

            db.collection('rooms').doc(roomId)
            .collection('messages').orderBy('timestamp','asc')
            .onSnapshot(snapshot => (
            setMessages(snapshot.docs.map(doc => doc.data()),

            )));
            // db.collection('rooms').doc(roomId)
            // .collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
            //     setMessages(snapshot.docs.map(doc => doc.data())
            // )));
            
        }    
        
    }, [roomId])


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
    
    return (
        <MainWrapper>
            <MainHeader>
                <Avatar src={`https://avatars.dicebear.com/api/human/${random}.svg`} />
                <MainHeaderInfo>
                    <h3>{roomName}</h3>
                    <p>
                        {
                            messages[messages.length-1] ? 
                            <span>{((messages[messages.length-1].timestamp).toDate()).toUTCString()}</span>
                            :
                            <span>Empty room</span>
                        }    
                    
                    </p>
                </MainHeaderInfo>
                <MainHeaderIcons>
                    <IconButton >
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
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
                                {message.message}
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
                            {message.message}
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
