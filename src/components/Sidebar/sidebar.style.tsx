import styled from "styled-components";

const SidebarWrapper = styled.div`
  display: flex;
  flex: 0.35;
  height: 100%;
  padding: 15px;
  background-color: white;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
  .addButton {
    :hover,
    :active {
      background-color: transparent !important;
    }
    .MuiTouchRipple-root {
      display: none;
    }
    .MuiSvgIcon-root {
      height: 1.7em;
      width: 1.7em;
      transition: 0.2s linear;
      &:hover,
      :focus {
        transform: scale(1.1);
      }
    }
  }
  @media (max-width: 1000px) {
    flex: 1;
    margin-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  height: 10vh;
  width: 100%;
  align-items: center;
  margin-bottom: 5px;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
`;

const SidebarHeaderIcons = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: fit-content;

  & > .MuiIconButton-root {
    padding: 5px;

    .MuiSvgIcon-root {
      font-size: 1.5rem !important;
      color: #d3d3d3;
      transition: 0.2s ease-in;
      :hover {
        color: black;
      }
    }
  }
`;

const SidebarHeaderName = styled.p`
  display: block;
  font-weight: bold;
  text-align: left;
  padding-left: 10px;
  flex: 1;
`;

const SidebarSearch = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 5px;
  align-items: center;
  justify-content: space-between;

  & > .MuiIconButton-root {
    font-size: 1.5rem !important;
    color: lightgray;
    &:hover {
      color: black;
    }
  }
`;

const SidebarSearchInput = styled.input`
  border: none;
  flex: 1;
  padding: 5px;
  outline: none;
  border-bottom: 1px solid transparent;
  transition: 0.2s ease-in-out;
  ::placeholder {
    color: #e0e0e0;
    text-align: center;
  }
  &:focus {
    border-bottom: 1px solid #e0e0e0;
  }
`;

const SidebarChat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const ChatItem = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0;
  align-items: center;
  justify-content: space-between;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatItemInfo = styled.div`
  display: flex;
  flex: 1;
  margin-left: 10px;
  flex-direction: column;
  & > h2 {
    font-size: 1rem;
  }
  & > p {
    font-size: 0.9rem;
    color: darkgray;
    overflow: hidden;
    max-height: 5vh;
    display: inline-block;
    word-break: break-word;
  }
  @media (min-width: 1000px) {
    & > h2 {
      font-size: 1.5rem;
    }
  }
`;

export {
  SidebarWrapper,
  SidebarHeader,
  SidebarHeaderIcons,
  SidebarSearch,
  SidebarSearchInput,
  SidebarChat,
  ChatItem,
  ChatItemInfo,
  SidebarHeaderName,
};
