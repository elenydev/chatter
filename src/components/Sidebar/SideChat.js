import React, {useEffect, useState} from 'react'
import { ChatItem, ChatItemInfo  } from './SiebarComps'
import { Avatar } from '@material-ui/core';
import db from '../../services/firebase'
import {
  Link
} from "react-router-dom";
function SideChat({ id, name }) {
    
    const [lastMessage, setLastMessage] = useState([]);
    

    
    useEffect(() => {
        if(id){
        db.collection('rooms').doc(id)
        .collection('messages').orderBy('timestamp','desc')
        .onSnapshot(snapshot => (
        setLastMessage(snapshot.docs.map(doc => doc.data()))
        ));
        }
    }
    ,[id] )

    return (
        <>
                <Link key={id} to={`/rooms/${id}`}>
                <ChatItem id={id}>
                    <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`}/>
                    <ChatItemInfo>
                        <h2>{name}</h2>
                        <p>{lastMessage[0] ? lastMessage[0].message : 'Empty room'}</p>
                    </ChatItemInfo>
                </ChatItem>
                </Link> 
        </>
    )
}

export default SideChat
