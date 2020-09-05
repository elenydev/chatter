import React, {useState} from 'react'
import {MainFooter, MainFooterInput} from './main.style'
import SendIcon from '@material-ui/icons/Send';
import {useSelector} from 'react-redux'
import {selectUser} from '../../features/user/userSlice'
import firebase from 'firebase'
import db, {storage} from '../../services/firebase'
import { IconButton } from '@material-ui/core';
import {useParams} from 'react-router-dom'
import 'emoji-mart/css/emoji-mart.css'
import { Picker, emojiIndex } from 'emoji-mart';
import MoodIcon from '@material-ui/icons/Mood';
import '../../index.css'
import AttachFileIcon from '@material-ui/icons/AttachFile';


function Footer() {
    const currentUser = useSelector(selectUser);
    const [input, setInputValue] = useState('');
    const { roomId } = useParams();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [fileUrl, setFileUrl] = useState('');

    function toggleEmojiPicker() {
        setShowEmojiPicker(!showEmojiPicker)
    }
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendMsg(e);
        }
    }
    const fileChange = async (e) =>{
      const file = e.target.files[0];
      const fileRef = storage.child(file.name);
      await fileRef.put(file)
      setFileUrl(await fileRef.getDownloadURL())
    }

    const sendMsg = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            author: currentUser.displayName,
            email: currentUser.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            photo: fileUrl
        });
        setInputValue('');
        setFileUrl('');
    }
    function addEmoji(emoji) {
        
        const text = `${input}${emoji.native}`;
        setInputValue(text);
        toggleEmojiPicker();
      }

    return (
        <>  
        {showEmojiPicker ? (
        <Picker set="google" onSelect={addEmoji} />
        ) : null} 
        <MainFooter onSubmit={sendMsg}>
            <button
            type="button"
            className="centerEmoji"
            onClick={toggleEmojiPicker}
            >
                <MoodIcon />
            </button>
            <MainFooterInput
                    className="message-input my-textarea"
                    name="newMessage"
                    value={input}
                    loadingComponent={() => <span>Loading</span>}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={fileUrl ? 'Photo added ' : 'Insert Message'}
                    trigger={{
                      ':': {
                        dataProvider: token =>
                          emojiIndex.search(token).map(o => ({
                            colons: o.colons,
                            native: o.native,
                          })),
                        component: ({ entity: { native, colons } }) => (
                          <div>{`${colons} ${native}`}</div>
                        ),
                        output: item => `${item.native}`,
                      },
                    }}
                  />
            <input type="file" id="sampleFile" style={{display:'none'}} onChange={fileChange} />
            <IconButton htmlFor="sampleFile" component="label" role="none" label="Add file">
              <AttachFileIcon/>
            </IconButton>
            <IconButton onClick={sendMsg} label="Send Message">
                <SendIcon />
            </IconButton>
        </MainFooter>
        </>
    )
}

export default Footer
