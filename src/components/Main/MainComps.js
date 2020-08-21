import styled from 'styled-components';

const MainWrapper = styled.main`
display: flex;
flex: 0.65;
height: 100%;
padding: 15px;
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

export { MainWrapper, MainHeader, MainHeaderInfo, MainHeaderIcons }