import React, {useEffect, useState, useRef} from 'react'
import { SidebarWrapper, SidebarHeader, SidebarHeaderIcons, SidebarSearch, SidebarSearchInput, SidebarChat, SidebarAddButton } from './SiebarComps'
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MessageIcon from '@material-ui/icons/Message';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SideChat from './SideChat'
import db from '../../services/firebase'
import {selectUser, logout} from '../../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useConfirm } from 'material-ui-confirm';

function Sidebar() {
    const confirm = useConfirm()
    const [rooms, setRooms] = useState([]);
    const currentUser = useSelector(selectUser);
    const inputElement = useRef(null)
    const [oldArr, setOldArr] = useState([])
    const roomStart = useRef(null)
    const dispatch = useDispatch();

    const createChat = () =>{
        const roomName = prompt('Please enter name of new chat room');
        if(roomName) {
            db.collection('rooms').add({
                name: roomName,
            });
        }
    }
    useEffect(() =>{
        const unsubscribeRooms = db.collection('rooms').onSnapshot(snapshot =>{
            setRooms(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })))
            setOldArr(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })))

        })
        return () => unsubscribeRooms();
    },[])
    const scrollToBottom = () => {
        if(roomStart){
        roomStart.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        }
        else return
     }
    useEffect(scrollToBottom, [rooms]);

    const logOut = () =>{
        confirm({description: 'You want to log out?'})
        .then(() => dispatch(logout()))
        .catch(() => null)
    }
    

    const SearchFunction = () =>{
        let value = inputElement.current.value
        
        if(rooms.filter(room => (room.data.name).toLowerCase() === (value).toLowerCase())){
        const filtered = rooms.filter(room => (room.data.name).toLowerCase() === (value).toLowerCase());
            if(filtered.length > 0 ) setRooms(filtered);
            else setRooms(oldArr)
        }
        else{
            return null
        }
    
    }
    return (
        <SidebarWrapper>
            <SidebarHeader>
                <Avatar src={`${currentUser.photo}`}/>
                <SidebarHeaderIcons>
                    <IconButton >
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton onClick={createChat}>
                        <MessageIcon />
                    </IconButton>
                    <IconButton onClick={logOut}>
                        <MoreVertIcon />
                    </IconButton>
                </SidebarHeaderIcons>
            </SidebarHeader>
            <SidebarSearch>
                <IconButton onClick={SearchFunction}>
                    <SearchIcon />
                </IconButton>
                <SidebarSearchInput placeholder="Search for existing chat" ref={inputElement} onChange={SearchFunction}/>
            </SidebarSearch>
            <SidebarAddButton onClick={createChat}>Add</SidebarAddButton>
            <SidebarChat>
                <div ref={roomStart}></div>
                { rooms.length >=1 ? rooms.map( room =>(
                    <SideChat key={room.id} id={room.id} name={room.data.name} />
                )) :
                'There is no rooms yet'
            }
            </SidebarChat>
        </SidebarWrapper>
    )
}

export default Sidebar
