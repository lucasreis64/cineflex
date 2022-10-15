import {keyframes} from "styled-components";

export const animations = {
    deslizarEsquerda: keyframes`
    from{opacity:0; transform: translateX(-600px)}
    to{opacity:1; transform: translateX(-0px)}
    `
    ,
    variarQuatroVezes: keyframes`
    0% {
        transform: translateY(-20%);
        opacity: 0.2;
    }
    25% {
        transform: translateY(20%);
        opacity: 0.5;
    }
    50% {
        transform: translateY(-10%);
        opacity: 0.7;
    }
    75% {
        transform: translateY(10%);
        opacity: 1;
    }
    100%{
        transform: translateY(0%);
        opacity: 1;
    }`
    ,
    variarSeisVezes: keyframes`
    0% {
        transform: translateY(-100%);
        opacity: 0.2;
    }
    17% {
        transform: translateY(100%);
        opacity: 0.5;
    }
    34% {
        transform: translateY(-60%);
        opacity: 0.7;
    }
    51% {
        transform: translateY(60%);
        opacity: 1;
    }
    68%{
        transform: translateY(-30%);
        opacity: 1;
    }
    85%{
        transform: translateY(30%);
        opacity: 1;
    }
    100%{
        transform: translateY(0%);
        opacity: 1;
    }`
    ,
    trovao: keyframes`
        from{filter: brightness(0.7);}
        to{filter: brightness(1);}
    `
    ,
    deslizarCima: keyframes`
        from{opacity:0;transform: translateY(-600px)}
        to{opacity:1;transform: translateY(0px)}
    `
    ,
    rolarCair : keyframes`
        0% {
            transform-origin: top left;
            animation-timing-function: ease-in-out;
        }
        20%, 60% {
            transform: rotate3d(0, 0, 1, 80deg);
            transform-origin: top left;
            animation-timing-function: ease-in-out;
        }
        40%, 80% {
            transform: rotate3d(0, 0, 1, 60deg);
            transform-origin: top left;
            animation-timing-function: ease-in-out;
            opacity: 1;
        }
        to {
            transform: translate3d(0, 700px, 0);
            opacity: 0;
        }
    `
    ,
    tremerZoom: keyframes`
        from {
            transform: scale3d(1, 1, 1);
        }
        10%, 20% {
            transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
        }
        30%, 50%, 70%, 90% {
            transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
        }
        40%, 60%, 80% {
            transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
        }
        to {
            transform: scale3d(1, 1, 1);
        }
    `
    ,
    loading: keyframes`
        100%{
        transform:translateX(100%);
    }
    `
}

