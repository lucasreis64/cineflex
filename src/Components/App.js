import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../Auxiliares/GlobalStyles"
import Filme from "./Filme"
import Principal from "./Principal"
import Header from "./Header"
import Sessao from "./Sessao/Sessao"
import Sucesso from "./Sucesso"

export default function App() {
    
    return (
        <>
            <GlobalStyle/>
            <Header/>
            <BrowserRouter>
                <Routes>
                        <Route path="/" element={<Principal/>} />
                        <Route path="/filme/:idFilme" element={<Filme/>}/>
                        <Route path="/sessao/:idSessao" element={<Sessao/>}/>
                        <Route path="/sucesso" element={<Sucesso/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
};

