import styled from 'styled-components';

const MainWrapper = styled.main`
display: flex;
flex: 0.65;
height: 100%;
background-color: white;
flex-direction: column;
`
const MainHeader = styled.div`
display: flex;
width: 100%;
border-bottom: 1px solid #E0E0E0;
align-items: center;
height: 10vh;
justify-content: space-between;
padding: 15px;
`
const MainHeaderInfo = styled.div`
display: flex;
flex-direction: column;
margin-left: 10px;
flex: 1;
    & > p{
        color: darkgray
        }
`
const MainHeaderIcons = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
        .MuiSvgIcon-root {
            font-size: 1.2rem !important;
            color: #D3D3D3;
            transition: 0.2s ease-in;
            :hover{
                color: black;
            }
        }
`
const MainContent = styled.div`
display: flex;
flex: 1;
background-color: #D8D8D8;
border-bottom: 1px solid darkgray;
padding: 15px;
justify-content: flex-start;
flex-direction: column;
`
const MainFooter = styled.div`
display: flex;
height: 5vh;
padding: 15px;
align-items: center;
justify-content: space-between;
background-color: #F0F0F0;
`
const MainFooterInput = styled.input`
display: flex;
flex: 1;
margin: 0 5px;
background-color: white;
padding: 3px 10px;
border: none;
border-radius: 20px;
outline: none;
 ::placeholder{
    color: lightgray;
 }
`
const Message = styled.div`
display: flex;
justify-content: flex-start;
width: 100%;
margin-bottom: 10px;
align-items: center;
height: fit-content;
`
const OwnMessage = styled.div`
display: flex;
justify-content: flex-end;
width: 100%;
margin-bottom: 10px;
align-items: center;
height: fit-content;
  p{
      background-color: #4285F4;
  }
  span{
      right: 0%;
  }
`
const MessageContent = styled.p`
display: flex;
padding: 3px 10px;
width: fit-content;
font-size: 0.85rem;
background-color: #505050;
justify-self: flex-end;
color: white;
position: relative;
height: fit-content;
border-radius: 15px;
margin-left: 5px;
 span{
     display: inline-block;
     color: black;
     position: absolute;
     left: 0%;
     top: -15px;
     width: 300px;
     font-size: 0.6rem;
     font-weight: bold;
     padding: 0 2px;
 }
`

export { MainWrapper, MainHeader, MainHeaderInfo, MainHeaderIcons, MainContent, MainFooter, MainFooterInput, MessageContent, Message, OwnMessage }