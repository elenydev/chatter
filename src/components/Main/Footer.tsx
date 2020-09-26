import React, { KeyboardEvent, useState } from "react";
import { MainFooter, MainFooterInput } from "./main.style";
import SendIcon from "@material-ui/icons/Send";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import firebase from "firebase";
import db, { storage } from "../../services/firebase";
import { IconButton } from "@material-ui/core";
import { useParams } from "react-router-dom";
import "emoji-mart/css/emoji-mart.css";
import { Picker, emojiIndex } from "emoji-mart";
import MoodIcon from "@material-ui/icons/Mood";
import "../../index.css";
import AttachFileIcon from "@material-ui/icons/AttachFile";

const IconBtn: any = IconButton;
const emojiId: any = emojiIndex;
const MainInput: any = MainFooterInput;

const Footer = (): JSX.Element => {
  const currentUser = useSelector(selectUser);
  const { email, displayName } = currentUser;
  const [input, setInputValue] = useState("");
  const { roomId } = useParams<{ roomId: string }>();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMsg(e);
    }
  };
  const fileChange = async (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file = target.files[0];
    const fileRef = storage.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  const sendMsg = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      author: displayName,
      email: email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      photo: fileUrl,
    });
    setInputValue("");
    setFileUrl("");
  };

  const addEmoji = (emoji) => {
    const text = `${input}${emoji.native}`;
    setInputValue(text);
    toggleEmojiPicker();
  };

  return (
    <>
      {showEmojiPicker ? <Picker set='google' onSelect={addEmoji} /> : null}
      <MainFooter onSubmit={sendMsg} onKeyPress={handleKeyPress}>
        <button
          type='button'
          className='centerEmoji'
          onClick={toggleEmojiPicker}
        >
          <MoodIcon />
        </button>
        <MainInput
          className='message-input my-textarea'
          name='newMessage'
          value={input}
          loadingComponent={() => <span>Loading</span>}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={fileUrl ? "Photo added " : "Insert Message"}
          trigger={{
            ":": {
              dataProvider: (token) => {
                emojiId.search(token).map((o) => ({
                  colons: o.colons,
                  native: o.native,
                }));
              },
              component: ({ entity: { native, colons } }) => (
                <div>{`${colons} ${native}`}</div>
              ),
              output: (item) => `${item.native}`,
            },
          }}
        />
        <input
          type='file'
          id='sampleFile'
          style={{ display: "none" }}
          onChange={fileChange}
        />
        <IconBtn
          htmlFor='sampleFile'
          component='label'
          role='none'
          label='Add file'
        >
          <AttachFileIcon />
        </IconBtn>
        <IconBtn onClick={sendMsg} label='Send Message'>
          <SendIcon />
        </IconBtn>
      </MainFooter>
    </>
  );
};

export default Footer;
