import styled from 'styled-components'


const SidebarWrapper = styled.div`
display: flex;
flex: 0.35;
height: 100%;
padding: 15px;
background-color: white;
flex-direction: column;
border-right: 1px solid #E0E0E0;
`

const SidebarHeader = styled.div`
display: flex;
height: 10vh;
width: 100%;
align-items: center;
justify-content: space-between;
border-bottom: 1px solid #E0E0E0;
`
const SidebarHeaderIcons = styled.div`
display: flex;
justify-content: space-evenly;
width: fit-content;

    & > .MuiIconButton-root {
        padding: 5px;

        .MuiSvgIcon-root {
            font-size: 1.2rem !important;
            color: #D3D3D3;
            transition: 0.2s ease-in;
            :hover{
                color: black;
            }
        }
    }
`

const SidebarSearch = styled.div`
display: flex;
width: 100%;
margin-top: 15px;
align-items: center;
justify-content: space-between;
border-bottom: 1px solid #E0E0E0;

    & > .MuiIconButton-root{
        font-size: 1.2rem !important;
        color: lightgray;
        &:hover{
            color: black;
        }
    }
`
const SidebarSearchInput = styled.input`
border: none;
flex: 1;
padding: 5px;
outline: none;
border-bottom: 1px solid transparent;
transition: 0.2s ease-in-out;
 ::placeholder{
     color: #E0E0E0;
     text-align: center;
 }
 &:focus{
     border-bottom: 1px solid #E0E0E0;
 }
`
const SidebarChat = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 20px;

`
const ChatItem = styled.div`
display: flex;
width: 100%;
margin: 10px 0;
align-items: center;
justify-content: space-between;
overflow: scroll;
 &::-webkit-scrollbar{
     display: none;
 }
`
const ChatItemInfo = styled.div`
display: flex;
flex: 1;
margin-left: 10px;
flex-direction: column;
 & > h2{
     font-size: 1.5rem;
    }
 & > p{
     font-size: 0.9rem;
     color: darkgray;
 }

`



export { SidebarWrapper, SidebarHeader, SidebarHeaderIcons, SidebarSearch, SidebarSearchInput, SidebarChat, ChatItem, ChatItemInfo} 