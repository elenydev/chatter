import React, {useState, useEffect} from 'react'
import {MainWrapper, MainHeader, MainHeaderInfo, MainHeaderIcons, MainContent, MainFooter,MainFooterInput } from './MainComps'
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import Messages from './Messages'
function Main() {
    const [random, setRandom] = useState('');
    useEffect(() =>{
        setRandom(Math.floor(Math.random() * 3000 ));
    }, [])

    return (
        <MainWrapper>
            <MainHeader>
                <Avatar src={`https://avatars.dicebear.com/api/human/${random}.svg`} />
                <MainHeaderInfo>
                    <h3>Dev room</h3>
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
            <MainContent>
               <Messages />
            </MainContent>
            <MainFooter>
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <MainFooterInput placeholder="Type a message.." />
                <IconButton>
                    <SendIcon />
                </IconButton>
            </MainFooter>
        </MainWrapper>
    )
}

export default Main
