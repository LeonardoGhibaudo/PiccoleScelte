import type { Paziente } from "../models/types";
import { useState } from "react";


export function SchedaPaziente(props: {datiPaziente: Paziente}){

    const [sessioneAttiva, setSessioneAttiva] = useState<boolean>(false) 
   
    function  changeState(): boolean{
        if(sessioneAttiva === false){
            setSessioneAttiva(true)
        }else if(sessioneAttiva === true){
            setSessioneAttiva(false)
            
        }
        return sessioneAttiva
        
    }
    return (
        <div>
            <h1>Nome: {props.datiPaziente.pseudonimo}</h1>
            <p> Età: {props.datiPaziente.eta}</p>
            <button onClick={changeState}>
                {sessioneAttiva === true ? "Ferma Sessione" : "Avvia Sessione"}
            </button>
        </div>
    )

}
