import styled from "styled-components";
import {useState, useEffect, useContext} from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import { contexto } from "../Context/Context";
import back from "../../img/back.svg"

export default function Filme() {
    const navigate=useNavigate()
    const [filmeInfo, setFilmeInfo] = useState(null)
    const [filmeCapa, setFilmeCapa] = useState({})
    const {idFilme} = useParams()
    const {setNomeComprador} = useContext(contexto)
    function retroceder(){
        navigate(-1)
    }
    useEffect(()=>{
        const filmePromise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`)
        filmePromise.then(resposta => {
			setFilmeInfo(resposta.data.days);
            setFilmeCapa(resposta.data)
            setNomeComprador('oi')
		});

		filmePromise.catch(erro => {
			console.log(erro.response);
		});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>  
            <BotaoVoltar onClick={retroceder} src = {back} alt = "" />
            <FilmeContainer>
                    <h1>Selecione o horário</h1>
                    {(filmeInfo===null)?
                        "Carregando..."
                        :
                        filmeInfo.map((f)=>{
                            return(
                                <Disponibilidade key={f.id}>
                                    <h2 data-identifier="session-date">{f.weekday} - {f.date}</h2>
                                    <ButtonContainer>
                                        {f.showtimes.map((s)=>{
                                            return <Link key={s.id} to={`/sessao/${s.id}`}><button data-identifier="hour-minute-btn">{s.name}</button></Link>}
                                        )}
                                    </ButtonContainer>
                                </Disponibilidade>
                        )})
                    }
            </FilmeContainer>
            <FilmeFooter>
                <MolduraFilme data-identifier="movie-img-preview">
                <img  src={filmeCapa.posterURL} alt=''/></MolduraFilme>
                <h1 data-identifier="movie-and-session-infos-preview">{filmeInfo?filmeCapa.title:'Carregando...'}</h1>
            </FilmeFooter>
        </>
    )
};



const FilmeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3vh;
    padding: 12vh 5.5vw 18vh;
    h1{
        width: 100%;
        text-align: center;
        margin-bottom: 2vh;
        font-size: 6.5vw;
    }
`

const Disponibilidade = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4vh;
    font-weight: 400;
    font-size: 5.5vw;
    color: #293845;
`


const ButtonContainer = styled.div`
    display: flex;
    gap: 2vw;
    button{
        background: #E8833A;
        border-radius: 3px;
        border: none;
        color: white;
        height: 4.5vh;
        width: 23vw;
        font-size: 5vw;
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
    padding: 1vh 2vw;
    gap: 3vw;
    box-sizing: border-box;
    font-size: 7vw;
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
const BotaoVoltar = styled.img`
    width: 7vw;
    height: 7vw;
    position: fixed;
    top: 2.5%;
    left: 3%;
    z-index: 3;
`