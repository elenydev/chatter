import React, {useState, useEffect} from 'react'
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

    useEffect(() =>{
        if(roomId) {
            db.collection('rooms').doc(roomId)
            .onSnapshot(snapshot => (
            setRoomName(snapshot.data().name)));

            db.collection('rooms').doc(roomId)
            .collection('messages').orderBy('timestamp','asc')
            .onSnapshot(snapshot => (
            setMessages(snapshot.docs.map(doc => doc.data())
            )));
        }    
        
    }, [roomId])

    useEffect(() =>{
        setRandom(Math.floor(Math.random() * 3000 ));
        setRandomChat(Math.floor(Math.random() * 3000 ))
    },[roomId])


    
    return (
        <MainWrapper>
            <MainHeader>
                <Avatar src={`https://avatars.dicebear.com/api/human/${random}.svg`} />
                <MainHeaderInfo>
                    <h3>{roomName}</h3>
                    <p>Last seen 1 week ago</p>
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
            <MainContent id="scroll">
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
            </MainContent>
            <Footer />
        </MainWrapper>
    )
}

export default Main
