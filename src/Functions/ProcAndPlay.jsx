import { Proc } from "./Proc";


export function ProcAndPlay(globalEditor, songText) {
    if (!songText){
        console.log("Proc and Play : No Song Text ");
    }

    if (!globalEditor){
        console.log("Proc and Play : No global editor");
    }
    console.log(globalEditor)   
    if (globalEditor != null) { 
        Proc(globalEditor, songText);
        globalEditor.evaluate();
    }
}
