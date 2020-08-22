import React, {useEffect, useState} from 'react'
import { ChatItem, ChatItemInfo  } from './SiebarComps'
import { Avatar } from '@material-ui/core';
import db from '../../services/firebase'

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
            {rooms.map(room => (
                <ChatItem key={room.id} id={room.id}>
                    <Avatar src={`https://avatars.dicebear.com/api/human/${room.id}.svg`}/>
                    <ChatItemInfo>
                        <h2>{room.data.name}</h2>
                        <p>Message</p>
                    </ChatItemInfo>
                </ChatItem>
            ))}
            
        </>
    )
}

export default SideChat
