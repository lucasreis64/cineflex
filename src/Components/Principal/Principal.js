import styled from "styled-components";
import axios from "axios";
import {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import { loading } from "../../Auxiliares/animations";

export default function Principal() {
    const [filmes, setFilmes] = useState(null)
    const filmesLoading=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    useEffect(() => {
		const filmesPromise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        
		filmesPromise.then(resposta => {
			setFilmes(resposta.data);
		});

		filmesPromise.catch(erro => {
			console.log(erro.response);
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	});
    
    return(
            <FilmesContainer>
                <h1>Selecione o filme</h1>
                {filmes===null?
                    filmesLoading.map(()=><Loading data-identifier="movie-outdoor"><div/></Loading>)
                    :
                    filmes.map((f)=>{
                        return(
                        <Link key={f.id} to={`/filme/${f.id}`} className="link">
                            <MolduraFilme data-identifier="movie-outdoor"><img  src={f.posterURL} alt={f.title}/></MolduraFilme>
                        </Link>
                    )})
                }
            </FilmesContainer>
    )
}

const FilmesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2vh;
    align-items: center;
    justify-content: center;
    padding: 12vh 2vw;
    h1{
        width: 100%;
        text-align: center;
        margin-bottom: 2vh;
        font-size: 8vw;
    }
    link{
        width: 40%;
        height: inherit;
    }
`

const MolduraFilme = styled.div`
    width: 40vw;
    padding: 1.5vh 1vh;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
        width: 100%;
    }
`

const Loading = styled.div`
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    overflow: hidden;

    div{
        width: 40vw;
        height: 30vh;
        background: linear-gradient( to right , transparent, #e3e3e3, transparent);
        transform: translateX(-100%);
        animation: ${loading} 1s infinite;
    }
`


