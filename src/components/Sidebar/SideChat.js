import React, {useEffect, useState} from 'react'
import { ChatItem, ChatItemInfo  } from './SiebarComps'
import { Avatar } from '@material-ui/core';
import db from '../../services/firebase'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
function SideChat() {
    const [rooms, setRooms] = useState([]);

    useEffect(() =>{
        const unsubscribeRooms = db.collection('rooms').onSnapshot(snapshot =>{
            setRooms(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })))

        })

        return () => unsubscribeRooms();
    },[])

    return (
        <>
        <Router>
            {rooms.map(room => (
                <Link key={room.id} to={`rooms/${room.id}`}>
                <ChatItem id={room.id}>
                    <Avatar src={`https://avatars.dicebear.com/api/human/${room.id}.svg`}/>
                    <ChatItemInfo>
                        <h2>{room.data.name}</h2>
                        <p>Message</p>
                    </ChatItemInfo>
                </ChatItem>
                </Link>
            ))}
        </Router>    
        </>
    )
}

export default SideChat
