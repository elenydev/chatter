import React, { useEffect, useState, useRef } from "react";
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
import db from "../../services/firebase";
import * as firebase from "firebase";
import { Redirect } from "react-router";
import "firebase/auth";
import { selectUser, logout } from "../../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useConfirm } from "material-ui-confirm";

const IconBtn: any = IconButton;

const Sidebar = (): JSX.Element => {
  const confirm = useConfirm();
  const [rooms, setRooms] = useState<Room[]>([]);
  const currentUser = useSelector(selectUser);
  const { displayName, photo } = currentUser;
  const inputElement = useRef<null | HTMLInputElement>(null);
  const [oldArr, setOldArr] = useState<Room[]>([]);
  const roomStart = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const createChat = () => {
    const roomName = prompt("Please enter name of new chat room");

    if (roomName && roomName.length <= 15) {
      db.collection("rooms").add({
        name: roomName,
      });
    } else if (typeof roomName === "string") {
      if (roomName.trim().length === 0) {
        alert("Please provide room name");
      }
    } else {
      alert(
        "Room name is too long, you can provide maximum 15 characters. Try again"
      );
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

  const scrollToBottom = () => {
    roomStart?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };
  useEffect(scrollToBottom, [rooms]);

  const logOut = () => {
    confirm({ description: "You want to log out?" })
      .then(() => {
        return dispatch(logout()), firebase.auth().signOut();
      })
      .then(() => <Redirect to='/' />)
      .catch(() => null);
  };

  const searchFunction = () => {
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

  return (
    <SidebarWrapper>
      <SidebarHeader>
        <Avatar src={`${photo}`} alt='Current User' />
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
