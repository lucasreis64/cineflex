import styled from "styled-components";
import { useContext} from "react"
import { useNavigate } from "react-router-dom";
import { contexto } from "../Context";
import axios from "axios";


export default function FormDiv ({sessaoInfo, setNome, nome, cpf, setCpf}) {
    const {setNomeFilme, setDataFilme, setCpfComprador, setNomeComprador, setAssentos, idSelecionados, assentosSelecionados} = useContext(contexto)

    let navigate = useNavigate()
    function reservarAssento (event) {
        event.preventDefault();

        setNomeComprador(nome); setNomeFilme(sessaoInfo.movie.title); setAssentos(assentosSelecionados);
        setDataFilme(`${sessaoInfo.day.weekday} - ${sessaoInfo.name}`); setCpfComprador(cpf);

        const obj = {
            ids: idSelecionados, name: nome, cpf: cpf
        }


        const reservar = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', obj)
        reservar.then((reservado)=>navigate('/sucesso'));
        reservar.catch((response)=>console.log(response.response))
    }

    return (
        <Form action='/sucesso' onSubmit={reservarAssento}>
            <h1>Nome do comprador</h1>
            <input required value={nome} onChange={(e)=>setNome(e.target.value)}/>
            <h1>CPF do comprador</h1>
            <input required value={cpf} maxLength="11" pattern="[0-9]{11}" onInput={(e)=>(e.target.setCustomValidity(''))} onChange={(e)=>setCpf(e.target.value.replace(/[^0-9]/g, ''))} onInvalid={(e)=>e.target.setCustomValidity('CPF INVÁLIDO!')}/>
            <button>Reservar assento(s)</button>
        </Form>
    )
}

const Form = styled.form`

`