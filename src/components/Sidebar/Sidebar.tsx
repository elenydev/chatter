import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import "firebase/auth";
import { selectUser, logout } from "../../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import db from "../../services/firebase";
import firebase from "firebase";



import {
  SidebarWrapper,
  SidebarHeader,
  SidebarHeaderIcons,
  SidebarSearch,
  SidebarSearchInput,
  SidebarChat,
  SidebarHeaderName,
} from "./sidebar.style";
import { Avatar, IconButton } from "@material-ui/core";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import SearchIcon from "@material-ui/icons/Search";
import SideChat from "./SideChat";

import { useConfirm } from "material-ui-confirm";

const IconBtn: any = IconButton;

const Sidebar = (): JSX.Element => {
  const confirm = useConfirm();
  const [rooms, setRooms] = useState<Room[]>([]);
  const currentUser = useSelector(selectUser);
  const { displayName, photoURL } = currentUser;
  const inputElement = useRef<null | HTMLInputElement>(null);
  const [oldArr, setOldArr] = useState<Room[]>([]);
  const roomStart = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const createChat = (): void => {
    const roomName = prompt("Please enter name of new chat room");

    if (roomName && roomName.length <= 15) {
      db.collection("rooms").add({
        name: roomName,
      });
    } else if (typeof roomName === "string") {
      if (roomName.trim().length === 0) {
        alert("Please provide room name");
        return;
      }
    } else {
      alert(
        "Room name is too long, you can provide maximum 15 characters. Try again"
      );
    }
  };

  const scrollToBottom = (): void => {
    roomStart?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const logOut = (): void => {
    confirm({ description: "You want to log out?" })
      .then(() => {
        dispatch(logout());
        firebase.auth().signOut();
        history.push("/");
      })
      .catch(() => undefined);
  };

  const searchFunction = (): void => {
    let value = inputElement?.current?.value.toLowerCase();
    if (value && value.trim().length > 0) {
      value = value.trim();
      setRooms(
        rooms.filter((room) => {
          return room.data.name.toLowerCase().includes(value);
        })
      );
    } else {
      setRooms(oldArr);
    }
  };

  useEffect(() => {
    const unsubscribeRooms = db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      setOldArr(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => unsubscribeRooms();
  }, []);
  useEffect(scrollToBottom, [rooms]);

  return (
    <SidebarWrapper>
      <SidebarHeader>
        <Avatar src={`${photoURL}`} alt='Current User' />
        <SidebarHeaderName>{displayName}</SidebarHeaderName>
        <SidebarHeaderIcons>
          <IconBtn onClick={logOut} label='logout'>
            <ExitToAppTwoToneIcon />
          </IconBtn>
        </SidebarHeaderIcons>
      </SidebarHeader>
      <SidebarSearch>
        <IconButton htmlFor='searchChat' component='label'>
          <SearchIcon />
        </IconButton>
        <SidebarSearchInput
          placeholder='Search for existing chat'
          id='searchChat'
          ref={inputElement}
          onChange={searchFunction}
        />
      </SidebarSearch>
      <IconBtn onClick={createChat} className='addButton' label='Create room'>
        <AddCircleOutlineTwoToneIcon />
      </IconBtn>
      <SidebarChat>
        <div ref={roomStart}></div>
        {rooms.length >= 1
          ? rooms.map((room) => (
              <SideChat key={room.id} id={room.id} name={room.data.name} />
            ))
          : "There is no rooms yet"}
      </SidebarChat>
    </SidebarWrapper>
  );
};

export default Sidebar;
