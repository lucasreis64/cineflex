/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useContext } from "react";
import { contexto } from "../Context/Context";
import { useNavigate } from "react-router-dom";



export default function Sucesso() {
    const {nomeComprador, cpfComprador, assentos, dataFilme, nomeFilme, setNomeComprador, setCpfComprador, setAssentos, setDataFilme, setNomeFilme} = useContext(contexto)
    let navigate = useNavigate()

    function zerarTudo(){
        setNomeComprador(''); setNomeFilme(''); setAssentos('');
        setDataFilme(''); setCpfComprador('');
        navigate('/');
    }

    return(
        <>  
            <SucessoContainer>
                <h1>Pedido feito com sucesso!</h1>
                <div >
                    <h2>Filme e sessão</h2>
                    <h3 data-identifier="movie-session-infos-reserve-finished">{nomeFilme}<br/>{dataFilme}</h3>
                </div>
                <div>
                    <h2>Ingressos</h2>
                    <div data-identifier="seat-infos-reserve-finished">{assentos.map((a,idx)=><h3  key={idx}>Assento {a+1}</h3>)}</div>
                </div>
                <div>
                    <h2>Comprador</h2>
                    <div data-identifier="buyer-infos-reserve-finished">
                        <h3>Nome: {nomeComprador}</h3>
                        <h3>CPF: {cpfComprador}</h3>
                    </div>
                </div>
                <button data-identifier="back-to-home-btn" onClick={()=>zerarTudo()}>Voltar para Home</button>
        </SucessoContainer>
        </>
    )
};



const SucessoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4vh;
    padding: 12vh 5.5vw 18vh;
    font-size: 4vw;
    h1{
        width: 100%;
        text-align: center;
        margin-bottom: 2vh;
        font-size: 7vw;
        color:green;
        font-weight: bold;
    }
    h2{
        font-weight: bold;
        font-size: 4.5vw;
        margin-bottom: 5px;
    }
    h3{
        margin-bottom: 2px;
    }
    button{
        align-self: center;
        background: #E8833A;
        border-radius: 3px;
        border: none;
        width: 60vw;
        height: 6vh;
        margin-top: 3.5vh;
        color: white;
        font-size: 5vw;
    }
`

