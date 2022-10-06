import { createContext , useState } from "react"

export const contexto = createContext({})

export const Context = (props) => {
const [nomeFilme, setNomeFilme] = useState('')
const [dataFilme, setDataFilme] = useState('')
const [assentos, setAssentos] = useState([])
const [nomeComprador, setNomeComprador] = useState('')
const [cpfComprador, setCpfComprador] = useState('')

    return (
        <contexto.Provider  value={{nomeFilme, setNomeFilme, dataFilme, setDataFilme, cpfComprador, setCpfComprador, nomeComprador, setNomeComprador, assentos, setAssentos}}>
            {props.children}
        </contexto.Provider>
    )
}
