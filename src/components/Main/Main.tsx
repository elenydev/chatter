import React, { useState, useEffect, useRef } from "react";
import db from "../../services/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { useParams } from "react-router-dom";
import "../../App.css";

import {
  MainWrapper,
  MainHeader,
  MainHeaderInfo,
  MainHeaderIcons,
  MainContent,
  Message,
  MessageContent,
  OwnMessage,
  MainContentInput,
} from "./main.style";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Footer from "./Footer";
import { https, http } from "../../Helpers/linksDetectors";
import { SRLWrapper } from "simple-react-lightbox";

function Main() {
  const currentUser = useSelector(selectUser);
  const [random, setRandom] = useState(0);
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState([]);
  const [messagesCopy, setMessagesCopy] = useState([]);
  const [randomChat, setRandomChat] = useState(0);
  const [roomName, setRoomName] = useState("");
  const RandomAvatar = 3000;
  const messageEndRef = useRef(null);
  const searchMessage = useRef(null);
  const RoomAvatar = `https://avatars.dicebear.com/api/human/${random}.svg`;
  const UsersAvatars = `https://avatars.dicebear.com/api/human/${randomChat}.svg`;
  const LastMessageDate = new Date(
    messages[messages.length - 1]?.timestamp?.toDate()
  ).toUTCString();

  useEffect(() => {
    if (roomId) {
      const subscription = db
        .collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
      return () => subscription();
    }
  }, [roomId]);

  useEffect(() => {
    setRandom(Math.floor(Math.random() * RandomAvatar));
    setRandomChat(Math.floor(Math.random() * RandomAvatar));

    if (roomId) {
      const subscription = db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          const addData = snapshot.docs.map((doc) => doc.data());
          setMessages(addData);
          setMessagesCopy(addData);
        });
      return () => subscription;
    } else {
      return null;
    }
  }, [roomId]);

  const scrollToBottom = () => {
    if (messageEndRef) {
      messageEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    } else return;
  };
  useEffect(scrollToBottom, [messages]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let message = searchMessage.current.value.toLowerCase();
    if (message && message.trim().length > 0) {
      message = message.trim();
      setMessages(
        messages.filter((msg) => {
          return msg.message.toLowerCase().includes(message);
        })
      );
    } else {
      setMessages(messagesCopy);
      searchMessage.current.value = "";
    }
  };

  const handleLinks = (message: string): boolean => {
    if (message.includes(https) || message.includes(http)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <MainWrapper>
      <MainHeader>
        <Avatar src={RoomAvatar} />
        <MainHeaderInfo>
          <h1>{roomName}</h1>
          <p>
            {messages[messages.length - 1] ? (
              <span>{LastMessageDate}</span>
            ) : (
              <span>Empty room</span>
            )}
          </p>
        </MainHeaderInfo>
        <MainHeaderIcons>
          <IconButton
            onClick={() => searchMessage.current.classList.toggle("active")}
            htmlFor='searchMessage'
            component='label'
          >
            <SearchIcon />
          </IconButton>
        </MainHeaderIcons>
        <MainContentInput
          type='text'
          id='searchMessage'
          placeholder='Search...'
          ref={searchMessage}
          onKeyPress={handleSearch}
        />
      </MainHeader>
      <MainContent>
        <>
          {messages.map((msg) => {
            const { email, message, timestamp, author, photo } = msg;
            if (email === currentUser.email) {
              return (
                <OwnMessage key={timestamp}>
                  <SRLWrapper>
                    <MessageContent>
                      {handleLinks(message) ? (
                        <a
                          href={message}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {message}
                        </a>
                      ) : (
                        message
                      )}
                      {photo ? (
                        <a href={photo} data-attribute='SRL'>
                          <img
                            src={photo}
                            alt='Message'
                            width='150px'
                            height='150px'
                          />
                        </a>
                      ) : null}
                      <span>{author}</span>
                    </MessageContent>
                  </SRLWrapper>
                  <Avatar src={`${currentUser.photoURL}`} />
                </OwnMessage>
              );
            } else {
              return (
                <Message key={timestamp}>
                  <Avatar src={UsersAvatars} />
                  <SRLWrapper>
                    <MessageContent>
                      {handleLinks(message) ? (
                        <a
                          href={message}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {message}
                        </a>
                      ) : (
                        message
                      )}
                      {photo ? (
                        <a href={photo} data-attribute='SRL'>
                          <img
                            src={photo}
                            alt='Message'
                            width='150px'
                            height='150px'
                          />
                        </a>
                      ) : null}
                      <span>{author}</span>
                    </MessageContent>
                  </SRLWrapper>
                </Message>
              );
            }
          })}
        </>
        <div ref={messageEndRef}></div>
      </MainContent>
      <Footer />
    </MainWrapper>
  );
}

export default Main;
