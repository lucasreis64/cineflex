import styled from "styled-components"

export default function MensagemErro ({setErro}) {
    return (
        <>
            <Fundo/>
            <MensagemErroDiv>
                <div>!</div>
                <p>Selecione ao menos um assento!</p>
                <button onClick={()=>setErro(false)}>Entendido!</button>
            </MensagemErroDiv>
        </>
    )
}

const MensagemErroDiv = styled.div`
    position: fixed;
    height: 40%;
    width: 70%;
    top: 30%;
    left: 15%;
    border-radius: 20px;
    background-color: white;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5% 5%;
    box-sizing: border-box;
    font-family: 'Saira';
    font-weight: 600;
    div{
        width:20vw;
        height: 20vw;
        border: 3px solid rgb(239, 93, 93);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16vw;
        color: rgb(239, 93, 93);
        margin-bottom: 4vh;
    }
    p{
        font-size: 6vw;
        text-align: center;
        color: rgb(124, 123, 123);
    }

    button{
        margin-top: 5%;
        border-radius: 50px;
        border: none;
        height: 7vh;
        font-size: 6vw;
        text-align: center;
        color: rgb(124, 123, 123);
        font-weight: 600;
        padding: 0 10px;
        transition: 500ms;
    }
    button:hover{
        color:  rgb(239, 93, 93);
        width: 20vh;
        height: 8vh;
        font-size: 7vw;
    }
`

const Fundo = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0%;
    left: 0%;
    background-color: black;
    opacity: 0.4;
    z-index: 2;
`