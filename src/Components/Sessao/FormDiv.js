import styled from "styled-components";
import { useContext, useState} from "react"
import { useNavigate } from "react-router-dom";
import { contexto } from "../Context/Context";
import MensagemErro from "./MensagemErro";
import axios from "axios";


export default function FormDiv ({sessaoInfo, setNome, nome, cpf, setCpf}) {
    const {setNomeFilme, setDataFilme, setCpfComprador, setNomeComprador, setAssentos, idSelecionados, assentosSelecionados} = useContext(contexto)
    const [erro, setErro] = useState(false)

    let navigate = useNavigate()
    function reservarAssento (event) {
        event.preventDefault();

        setNomeComprador(nome); setNomeFilme(sessaoInfo.movie.title); setAssentos(assentosSelecionados);
        setDataFilme(`${sessaoInfo.day.weekday} - ${sessaoInfo.name}`); setCpfComprador(cpf);

        const obj = {
            ids: idSelecionados, name: nome, cpf: cpf
        }

        if(assentosSelecionados.length>0){
            const reservar = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', obj)
            reservar.then((reservado)=>navigate('/sucesso'));
            reservar.catch((response)=>console.log(response.response))
            
        }
        else setErro(true)
    }
    console.log(erro)
    return (
        <>
            <Form action='/sucesso' onSubmit={reservarAssento}>
                <h1>Nome do comprador:</h1>
                <input required name="nome" placeholder="Digite seu nome..." value={nome} onChange={(e)=>setNome(e.target.value)}/>
                <h1>CPF do comprador:</h1>
                <input required name="cpf" placeholder="Digite seu CPF..." value={cpf} maxLength="11" pattern="[0-9]{11}" onInput={(e)=>(e.target.setCustomValidity(''))}
                onChange={(e)=>setCpf(e.target.value.replace(/[^0-9]/g, ''))} onInvalid={(e)=>e.target.setCustomValidity('CPF INVÁLIDO!')}/>
                <button>Reservar assento(s)</button>
            </Form>
            {erro?<MensagemErro setErro={setErro}/>:true}
        </>
    )
}

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1{
        font-size: 4vw !important;
        text-align: start !important;
        margin-bottom: 2px !important;
    }
    input{
        width: 100%;
        height: 6vh;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 3px;
        margin-bottom: 2vh;
        padding-left: 2vh;
        outline: none;
        box-sizing: border-box;
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
    input::placeholder{
        font-style: italic;
        font-weight: 400;
        font-size: 4vw;
        line-height: 21px;
        color: #AFAFAF;
    }
`