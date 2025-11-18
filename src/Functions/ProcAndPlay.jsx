import { ProcessText } from "./ProcessText";
import { Preprocess } from "../utils/PreprocessLogic";


export function ProcAndPlay({globalEditor, songText, volume}) {
    if (!songText){
        console.log("Proc and Play : No Song Text ");
        return;
    }

    if (!globalEditor){
        console.log("Proc and Play : No global editor");
        return; //Avoid Breaking It
    }
    console.log(globalEditor) 

    let outputText = Preprocess({ inputText: songText, volume });
    outputText = outputText.replaceAll('<p1_Radio>', ProcessText());

    globalEditor.setCode(outputText);
    globalEditor.evaluate();
}
