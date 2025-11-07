import { Proc } from "./Proc";
import { ProcessText } from "./ProcessText";
import { Preprocess } from "../utils/PreprocessLogic";


export function ProcAndPlay({globalEditor, songText, volume}) {
    if (!songText){
        console.log("Proc and Play : No Song Text ");
    }

    if (!globalEditor){
        console.log("Proc and Play : No global editor");
    }
    console.log(globalEditor) 

    let outputText = Proc({ globalEditor, inputText: songText, volume });

    outputText = outputText.replaceAll('<p1_Radio>', ProcessText());

    globalEditor.setCode(outputText);
    globalEditor.evaluate();
}
