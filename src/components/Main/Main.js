import React, {useState, useEffect, useRef} from 'react'
import {MainWrapper, MainHeader, MainHeaderInfo, MainHeaderIcons, MainContent, Message, MessageContent, OwnMessage, MainContentInput } from './MainComps'
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import db from '../../services/firebase'
import {useSelector} from 'react-redux'
import {useParams, } from 'react-router-dom'
import {selectUser } from '../../features/user/userSlice'
import Footer from './Footer'
import '../../index.css'
import {https, http} from '../../Helpers/Links'
import { SRLWrapper } from "simple-react-lightbox";

function Main() {
    const currentUser = useSelector(selectUser);
    const [random, setRandom] = useState('');
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [messagesCopy, setMessagesCopy] = useState([])
    const [randomChat, setRandomChat] = useState('')
    const [roomName, setRoomName] = useState('');
    const messageEndRef = useRef(null);
    const searchMessage = useRef(null)

    const searchInput = document.querySelector('#searchInput')

    useEffect(() =>{
        if(roomId) {
            const sub1 = db.collection('rooms').doc(roomId)
            .onSnapshot(snapshot => (
            setRoomName(snapshot.data().name)));
            return () => sub1();
        }    
        
    }, [roomId]);

    useEffect(() =>{
        if(roomId){
        const sub2 = db.collection('rooms').doc(roomId)
        .collection('messages').orderBy('timestamp','asc')
        .onSnapshot(snapshot => (
        setMessages(snapshot.docs.map(doc => doc.data())),
        setMessagesCopy(snapshot.docs.map(doc => doc.data()))
        ));
        return () => sub2();
        }
        else{
            return
        }

    }, [roomId]);


    useEffect(() =>{
        setRandom(Math.floor(Math.random() * 3000 ));
        setRandomChat(Math.floor(Math.random() * 3000 ))

    },[roomId])

    const scrollToBottom = () => {
        if(messageEndRef){
        messageEndRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        }
        else return
     }
    useEffect(scrollToBottom, [messages]);

    const handleSearch = (e) =>{
        let message = (searchMessage.current.value).toLowerCase();
        console.log(message)
        if(e.key === "Enter"){
            if(message){
                if(messages.filter(msg => (msg.message).toLowerCase() === message)){
                    const filtered = messages.filter(msg => (msg.message).toLowerCase() === message);
                        if(filtered.length > 0 ){
                            return setMessages(filtered), searchMessage.current.value = '', searchInput.classList.remove('active')
                            
                        }
                        else {
                            alert('Message not found')
                            setMessages(messagesCopy)
                            searchInput.classList.remove('active')
                        }
                    }
                else{
                    return null, setMessages(messagesCopy),searchInput.classList.remove('active')
                }
            }
            else{
                return null, setMessages(messagesCopy), alert('Message not found'), searchInput.classList.remove('active') 
            }
    }
    }

    const handleLinks = (message) =>{
        if(message.includes(https) || message.includes(http)){
             return true
        }
        else{
            return false
        }
    }

    return (
        <MainWrapper>
            <MainHeader>
                <Avatar src={`https://avatars.dicebear.com/api/human/${random}.svg`} />
                <MainHeaderInfo>
                    <h3>{roomName}</h3>
                    <p>
                        {
                            (messages[messages.length-1]) ?
                        <span>{new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</span>
                            :
                            <span>Empty room</span>
                        }    

                    </p>
                </MainHeaderInfo>
                <MainHeaderIcons>
                    <IconButton onClick={() => searchInput.classList.toggle('active')}>
                        <SearchIcon />
                    </IconButton>
                </MainHeaderIcons>
                <MainContentInput type="text" id="searchInput" placeholder="Search..." ref={searchMessage} onKeyPress={handleSearch}/>
            </MainHeader>
            <MainContent >
            <>
            {messages.map(message => {
                if(message.email === currentUser.email){
                    return( 
                        <OwnMessage key={message.timestamp}>
                            <SRLWrapper>
                            <MessageContent >
                                {handleLinks(message.message) ? <a href={message.message} target="_blank" rel="noopener noreferrer">{message.message}</a> : message.message}
                                {message.photo ? 
                                    <a href={message.photo} data-attribute="SRL">
                                        <img src={message.photo} alt="Message" width="150px" height="150px" />
                                    </a>
                                : null}
                                <span>{message.author}</span>
                            </MessageContent>
                            </SRLWrapper>
                            <Avatar src={`${currentUser.photo}`}/>
                        </OwnMessage>)
                    }
                else{
                    return(
                    <Message key={message.timestamp}>
                        <Avatar src={`https://avatars.dicebear.com/api/human/${randomChat}.svg`}/>
                        <SRLWrapper>
                        <MessageContent >
                            {handleLinks(message.message) ? <a href={message.message} target="_blank" rel="noopener noreferrer">{message.message}</a> : message.message}
                            {message.photo ? 
                                    <a href={message.photo} data-attribute="SRL">
                                         <img src={message.photo} alt="Message" width="150px" height="150px" />
                                    </a>
                            : null}
                            <span>{message.author}</span>
                        </MessageContent>
                        </SRLWrapper>
                    </Message>
                    )
                    }
                }
            )
            }
            </>
            <div ref={messageEndRef}></div>
            </MainContent>
            <Footer />
        </MainWrapper>
    )
}

export default Main
