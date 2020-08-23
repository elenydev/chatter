import React, {useState, useEffect} from 'react'
import { Message, MessageContent, OwnMessage } from './MainComps'
import { Avatar } from '@material-ui/core';
import db from '../../services/firebase'
import {useSelector} from 'react-redux'
import {selectUser} from '../../features/user/userSlice'
function Messages() {

    const currentUser = useSelector(selectUser);
    const [randomChat, setRandomChat] = useState('')
    const [messages, setMessages] = useState([]);
    useEffect(() =>{
        setRandomChat(Math.floor(Math.random() * 3000 ))
    }, [])
    
    useEffect(() =>{
        const unsubscribe = db.collection('rooms').doc('VSFDoZv0S1mAU6PaYUJk')
        .collection('messages').orderBy('timestamp','desc')
        .onSnapshot(snapshot => (
            setMessages(snapshot.docs.map(doc => doc.data()))
            
        ))
            
        return () => unsubscribe();
    },[])


    return (
       <>
       {messages.map(message => (
           <>
            {message.email === currentUser.email ? 
            <OwnMessage key={message.message}>
                <MessageContent >
                {message.message}
                <span>{message.author}</span>
                </MessageContent>
            </OwnMessage>
            : 
            <>
            <Message key={message.message}>
                <Avatar src={`https://avatars.dicebear.com/api/human/${randomChat}.svg`}/>
                <MessageContent >
                    {message.message}
                    <span>{message.author}</span>
                </MessageContent>
            </Message>
            </>
            }
            </>
       ))}
       </>

    )
}

export default Messages
