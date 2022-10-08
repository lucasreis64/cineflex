/* eslint-disable no-unused-vars */
import styled from "styled-components";
import {useState, useEffect, useContext} from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import FormDiv from "./FormDiv"
import DemonstracaoDiv from "./DemonstracaoDiv"
import LugaresContainerDiv from "./LugaresContainerDiv"

export default function Sessao() {
    const [sessaoInfo, setSessaoInfo] = useState(null)
    const {idSessao} = useParams()
    const [paint, setPaint] = useState('')
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    
    useEffect(()=>{
        const filmePromise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`)
        filmePromise.then(resposta => {
			setSessaoInfo(resposta.data);
		});

		filmePromise.catch(erro => {
			console.log(erro.response);
		});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>
            <SessaoContainer>
                    <h1>Selecione os assentos</h1>
                    <LugaresContainerDiv sessaoInfo={sessaoInfo} setPaint={setPaint} paint={paint}/>
                    <DemonstracaoDiv/>
                    <FormDiv sessaoInfo={sessaoInfo} setNome={setNome} nome={nome} cpf={cpf} setCpf={setCpf} />
            </SessaoContainer>
            <FilmeFooter>
                <MolduraFilme><img  src={sessaoInfo?sessaoInfo.movie.posterURL:'Carregando...'} alt=''/></MolduraFilme>
                <div><h1>{sessaoInfo?sessaoInfo.movie.title:'Carregando...'}</h1><h1>{sessaoInfo?`${sessaoInfo.day.weekday} - ${sessaoInfo.name}`:'Carregando...'}</h1></div>
            </FilmeFooter>
        </>
    )
};

const SessaoContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2vh;
    padding: 12vh 5.5vw 18vh;
    h1{
        width: 100%;
        text-align: center;
        margin-bottom: 2vh;
        font-size: 8vw;
    }
`

const FilmeFooter = styled.div`
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 14%;
    background: #DFE6ED;
    border: 1px solid #9EADBA;
    display: flex;
    align-items: center;
    padding: 0 2vw;
    gap: 3vw;
    box-sizing: border-box;
`

const MolduraFilme = styled.div`
    width: 8vh;
    padding: 0.75vh 0.75vh;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    box-sizing: border-box;

    img{
        width: 100%;
    }
`