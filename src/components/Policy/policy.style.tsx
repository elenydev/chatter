import styled from "styled-components";

const PolicyWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 10vh 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  & > a {
    display: block;
    width: fit-content;
    font-weight: 700;
  }
`;

const PolicyHeader = styled.h1`
  width: 100%;
  display: block;
  font-size: 3em;
  text-align: center;
  margin-bottom: 50px;
`;

const PolicyList = styled.ol`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const PolicyListItem = styled.li`
  font-weight: 500;
  font-size: 0.8em;
  margin: 5px 0;
`;

const PolicyFooter = styled.footer`
  width: 100%;
  font-size: 0.6em;
  text-align: center;
`;

export {
  PolicyWrapper,
  PolicyHeader,
  PolicyList,
  PolicyListItem,
  PolicyFooter,
};
