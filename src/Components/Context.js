import { createContext , useState } from "react"

export const contexto = createContext({})

export const Context = (props) => {
const [nomeFilme, setNomeFilme] = useState('')
const [dataFilme, setDataFilme] = useState('')

    return (
        <contexto.Provider  value={{nomeFilme, setNomeFilme, dataFilme, setDataFilme}}>
            {props.children}
        </contexto.Provider>
    )
}
