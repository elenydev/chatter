import React, {useEffect, useState, useRef} from 'react'
import { SidebarWrapper, SidebarHeader, SidebarHeaderIcons, SidebarSearch, SidebarSearchInput, SidebarChat, SidebarHeaderName } from './sidebar.style'
import { Avatar, IconButton } from '@material-ui/core';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
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
        let value = (inputElement.current.value).toLowerCase()
        if(value && value.trim().length > 0){
            value = value.trim();
            setRooms(rooms.filter(room =>{
                return (room.data.name).toLowerCase().includes(value);
            }));
        }
        else{
            setRooms(oldArr)
        }
    }
    return (
        <SidebarWrapper>
            <SidebarHeader>
                <Avatar src={`${currentUser.photo}`} alt="Current User"/>
                <SidebarHeaderName>{currentUser.displayName}</SidebarHeaderName>
                <SidebarHeaderIcons>
                    <IconButton onClick={logOut} label="logout">
                        <ExitToAppTwoToneIcon />
                    </IconButton>
                </SidebarHeaderIcons>
            </SidebarHeader>
            <SidebarSearch>
                <IconButton  htmlFor="searchChat" component="label">
                    <SearchIcon  />
                </IconButton>
                <SidebarSearchInput placeholder="Search for existing chat" id="searchChat" ref={inputElement} onChange={SearchFunction}/>
            </SidebarSearch>
            <IconButton onClick={createChat} className="addButton" label="Create room">
                <AddCircleOutlineTwoToneIcon />
            </IconButton>
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
