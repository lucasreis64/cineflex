/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useContext } from "react";
import { contexto } from "./Context";

export default function Sucesso() {
    const {nomeComprador, cpfComprador, assentos, dataFilme, nomeFilme} = useContext(contexto)
    console.log(nomeComprador)
    return(
        <>
            <SucessoContainer>
                <h1>Pedido feito com sucesso!</h1>
                <div>
                    <h2>Filme e sessão</h2>
                    <h3>{nomeFilme}<br/>{dataFilme}</h3>
                </div>
                <div>
                    <h2>Ingressos</h2>
                    {assentos.map(a=><h3>Assento {a+1}</h3>)}
                </div>
                <div>
                    <h2>Comprador</h2>
                    <h3>Nome: {nomeComprador}</h3>
                    <h3>CPF: {cpfComprador}</h3>
                </div>
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
    h1{
        width: 100%;
        text-align: center;
        margin-bottom: 2vh;
        font-size: 8vw;
    }
    h2{
        font-weight: bold;
    }
`