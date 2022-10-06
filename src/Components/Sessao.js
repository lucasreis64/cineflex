/* eslint-disable no-unused-vars */
import styled from "styled-components";
import {useState, useEffect, useContext} from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sessao() {
    const [sessaoInfo, setSessaoInfo] = useState(null)
    const {idSessao} = useParams()

    
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
                    <LugaresContainer>
                        {(sessaoInfo===null)?
                            "Carregando..."
                            :
                            sessaoInfo.seats.map((s)=>{
                                return(
                                    <Lugares key={s.id}>
                                        {s.name}
                                    </Lugares>
                            )})
                        }
                    </LugaresContainer>
                    <Demonstracao>
                        <div><button borda={'#0E7D71'} cor={'#1AAE9E'}/>{'Selecionado'}</div>
                        <div><button borda={'#7B8B99'} cor={'#C3CFD9'}/>{'Disponível'}</div>
                        <div><button borda={'#F7C52B'} cor={'#FBE192'}/>{'Indisponível'}</div>
                    </Demonstracao>
            </SessaoContainer>
            <FilmeFooter>
                <MolduraFilme><img  src={sessaoInfo?sessaoInfo.movie.posterURL:'Carregando...'} alt=''/></MolduraFilme>
                <div><h1>{sessaoInfo?sessaoInfo.movie.title:'Carregando...'}</h1><h1>{sessaoInfo?`${sessaoInfo.day.weekday} - ${sessaoInfo.name}`:'Carregando...'}</h1></div>
            </FilmeFooter>
        </>
    )
    
};

const Demonstracao = styled.div`

`

const LugaresContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1vh;
    justify-content: center;
`

const Lugares = styled.button`
    width: 6.5vw;
    height: 6.5vw;
    background: #C3CFD9;
    border: 1px solid #808F9D;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0.8%;
    font-size: 4vw;
`

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
    width: 13vw;
    padding: 1vh 0.75vh;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;

    img{
        width: 100%;
    }
`