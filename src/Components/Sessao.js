/* eslint-disable no-unused-vars */
import styled from "styled-components";
import {useState, useEffect, useContext} from "react"
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { contexto } from "./Context";

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
            console.log(resposta.data)
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

function FormDiv ({sessaoInfo, setNome, nome, cpf, setCpf}) {
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

function LugaresContainerDiv ({sessaoInfo, setPaint, paint}) {
    const {idSelecionados, assentosSelecionados, setIdSelecionados, setAssentosSelecionados}=useContext(contexto)
    const [disparador, setDisparador] = useState(1)
    console.log(assentosSelecionados)
    function pintarAssento (avaiable, idx, id) {
    if (avaiable===true){
            if (id===undefined) {
                return '#C3CFD9'
            }
            if(idSelecionados.includes(id)){
                const index = idSelecionados.indexOf(id, 0)
                let idCopy = idSelecionados
                let assentosCopy = assentosSelecionados
                idCopy.splice(index,1)
                assentosCopy.splice(index,1)
                console.log(idSelecionados, assentosSelecionados, idCopy, assentosCopy)
                setIdSelecionados(idCopy)
                setAssentosSelecionados(assentosCopy)
                setDisparador(disparador+1)
                return '#C3CFD9'
            }
            else {
                setPaint(idx)
                let idCopy = idSelecionados
                let assentosCopy = assentosSelecionados
                idCopy.push(id)
                assentosCopy.push(idx)
                setIdSelecionados(idCopy)
                setAssentosSelecionados(assentosCopy)
                return '#1AAE9E'
            }
        }
    else {
        return '#FBE192'
    }
    }

    return(
        <LugaresContainer>
            {(sessaoInfo===null)?
                "Carregando..."
                :
                sessaoInfo.seats.map((s,index)=>{
                    return(
                        <Lugares key={s.id} disparador={disparador} assentosSelecionados={assentosSelecionados} verificarSelecionado={verificarSelecionado} indice={index} disponibilidade={s.isAvailable} onClick={()=>pintarAssento(s.isAvailable, index, s.id)} paint={paint} pintar={()=>pintarAssento(s.isAvailable)}>
                            {s.name}
                        </Lugares>
                )})
            }
        </LugaresContainer>
    )
}

function DemonstracaoDiv () {
    return (
        <Demonstracao>
            <div><Button borda={'#0E7D71'} cor={'#1AAE9E'}/>{'Selecionado'}</div>
            <div><Button borda={'#7B8B99'} cor={'#C3CFD9'}/>{'Disponível'}</div>
            <div><Button borda={'#F7C52B'} cor={'#FBE192'}/>{'Indisponível'}</div>
        </Demonstracao>
    )
}

function verificarSelecionado (idx, assentos) {
    if(assentos.includes(idx)){
        console.log('ok')
        return true
    }
    else{return false}
}   

const Form = styled.form`

`

const Button = styled.button`
        width: 6.5vw;
        height: 6.5vw;
        background: ${props=>props.cor} !important;
        border: 1px solid #808F9D;
        border-radius: 50%;
        align-self: center;
`

const Demonstracao = styled.div`
    display: flex;
    gap: 4vw;
    div{
        display: flex;
        flex-direction: column;
        width: 20vw;
        font-size: 3vw;
        text-align: center;
        gap: 1vh;
    }
    button{
        width: 6.5vw;
        height: 6.5vw;
        background: ${props=>props.cor} !important;
        border: 1px solid #808F9D;
        border-radius: 50%;
    }
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
    background: ${props=> verificarSelecionado(props.indice, props.assentosSelecionados) && props.disparador ? '#1AAE9E' : props.pintar};
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