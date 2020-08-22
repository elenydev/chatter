import React, {useState, useEffect} from 'react'
import { Message, MessageContent } from './MainComps'
import { Avatar } from '@material-ui/core';
function Messages() {
    const [randomChat, setRandomChat] = useState('')
    useEffect(() =>{
        setRandomChat(Math.floor(Math.random() * 3000 ))
    }, [])

    return (
        <Message>
        <Avatar src={`https://avatars.dicebear.com/api/human/${randomChat}.svg`}/>
        <MessageContent>
            Elo elo
            <span>Marcin najman</span>
        </MessageContent>
        </Message>
    )
}

export default Messages
