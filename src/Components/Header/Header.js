import styled from "styled-components";

export default function Header() {
    return (
        <>
            <HeaderDiv>CINEFLEX</HeaderDiv>
        </>
    )
}

const HeaderDiv = styled.div`
    position: fixed;
    width: 100%;
    height: 8%;
    left: 0px;
    top: 0px;
    background: #C3CFD9;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 10vw;
    color: #e8833a;
`

