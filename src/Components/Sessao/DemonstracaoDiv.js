import styled from "styled-components"

export default function DemonstracaoDiv() {
    return (
        <Demonstracao>
            <div data-identifier="seat-selected-subtitle"><Button borda={'#0E7D71'} cor={'#1AAE9E'}/>{'Selecionado'}</div>
            <div ><Button data-identifier="seat-available-subtitle" borda={'#7B8B99'} cor={'#C3CFD9'}/>{'Disponível'}</div>
            <div><Button data-identifier="seat-unavailable-subtitle" borda={'#F7C52B'} cor={'#FBE192'}/>{'Indisponível'}</div>
        </Demonstracao>
    )
};

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

const Button = styled.button`
        width: 6.5vw;
        height: 6.5vw;
        background: ${props=>props.cor} !important;
        border: 1px solid #808F9D;
        border-radius: 50%;
        align-self: center;
`
