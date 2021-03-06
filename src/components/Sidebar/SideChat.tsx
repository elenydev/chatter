import React, { useEffect, useState } from "react";
import { ChatItem, ChatItemInfo } from "./sidebar.style";
import { Avatar } from "@material-ui/core";
import db from "../../services/firebase";
import { Link } from "react-router-dom";

const SideChat = ({ id, name }): JSX.Element => {
  const [lastMessage, setLastMessage] = useState([]);
  const avatarURL = `https://avatars.dicebear.com/api/human/${id}.svg`;

  useEffect(() => {
    if (id) {
      const unsubscribe = db
        .collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setLastMessage(snapshot.docs.map((doc) => doc.data()))
        );

      return () => unsubscribe();
    }
  }, [id]);

  return (
    <>
      <Link key={id} to={`/rooms/${id}`}>
        <ChatItem id={id}>
          <Avatar src={avatarURL} />
          <ChatItemInfo>
            <h2>{name}</h2>
            <p>{lastMessage[0] ? lastMessage[0].message : "Empty room"}</p>
          </ChatItemInfo>
        </ChatItem>
      </Link>
    </>
  );
};

export default SideChat;
