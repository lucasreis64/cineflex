import styled from "styled-components";
import {useState, useContext} from "react"
import { contexto } from "../Context";

export default function LugaresContainerDiv({setPaint, sessaoInfo, paint}) {

    const {idSelecionados, assentosSelecionados, setIdSelecionados, setAssentosSelecionados}=useContext(contexto)
    const [disparador, setDisparador] = useState(1)

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
                        <Lugares key={s.id} disparador={disparador} assentosSelecionados={assentosSelecionados} verificarSelecionado={verificarSelecionado}
                        indice={index} disponibilidade={s.isAvailable} onClick={()=>pintarAssento(s.isAvailable, index, s.id)} paint={paint} pintar={()=>pintarAssento(s.isAvailable)}>
                            {s.name}
                        </Lugares>
                )})
            }
        </LugaresContainer>
    )
};

function verificarSelecionado (idx, assentos) {
    if(assentos.includes(idx)){
        console.log('ok')
        return true
    }
    else{return false}
}   

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
