import ReactDOM from 'react-dom';
import App from "./Components/App"
import { Context } from "./Components/Context/Context"

ReactDOM.render(
    <Context>
        <App/>
    </Context>
    , document.querySelector('.root')
);
