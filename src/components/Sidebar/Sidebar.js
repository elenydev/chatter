import React from 'react'
import { SidebarWrapper, SidebarHeader, SidebarHeaderIcons, SidebarSearch, SidebarSearchInput, SidebarChat, SidebarAddButton } from './SiebarComps'
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MessageIcon from '@material-ui/icons/Message';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SideChat from './SideChat'
import db from '../../services/firebase'
import {selectUser} from '../../features/user/userSlice';
import { useSelector } from 'react-redux'
function Sidebar() {

    const currentUser = useSelector(selectUser);
    const createChat = () =>{
        const roomName = prompt('Please enter name of new chat room');
        if(roomName) {
            db.collection('rooms').add({
                name: roomName,
            });
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
                    <IconButton>
                        <MessageIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </SidebarHeaderIcons>
            </SidebarHeader>
            <SidebarSearch>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <SidebarSearchInput placeholder="Search for existing chat"/>
            </SidebarSearch>
            <SidebarAddButton onClick={createChat}>Add</SidebarAddButton>
            <SidebarChat>
                <SideChat />
            </SidebarChat>
        </SidebarWrapper>
    )
}

export default Sidebar
