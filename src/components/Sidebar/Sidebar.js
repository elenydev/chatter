import React, {useState, useEffect} from 'react'
import { SidebarWrapper, SidebarHeader, SidebarHeaderIcons, SidebarSearch, SidebarSearchInput, SidebarChat,ChatItem, ChatItemInfo } from './SiebarComps'
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MessageIcon from '@material-ui/icons/Message';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

function Sidebar() {
    const [random, setRandom] = useState('');

    useEffect(() =>{
        setRandom(Math.floor(Math.random() * 3000 ));
    }, [])

    return (
        <SidebarWrapper>
            <SidebarHeader>
                <Avatar />
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
            <SidebarChat>
                <ChatItem>
                    <Avatar src={`https://avatars.dicebear.com/api/human/${random}.svg`}/>
                    <ChatItemInfo>
                        <h2>Marcin najman</h2>
                        <p>Message</p>
                    </ChatItemInfo>
                </ChatItem>
            </SidebarChat>
        </SidebarWrapper>
    )
}

export default Sidebar
