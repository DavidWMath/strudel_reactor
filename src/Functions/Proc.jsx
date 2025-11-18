import { Preprocess, AddGainIfMissing } from "../utils/PreprocessLogic";
import { ProcessText } from "./ProcessText";

export function Proc({globalEditor, songText, volume}) {
    if (!songText){
        console.log("Proc and Play : No Song Text ");
    }

    if (!globalEditor){
        console.log("Proc and Paly : No global editor");
    }

    let outputText = Preprocess({ inputText: songText, volume });
    let proc_text_replaced = outputText.replaceAll('<p1_Radio>', ProcessText());
    let processedWithGain = AddGainIfMissing(proc_text_replaced, volume);
    console.log(processedWithGain);
    globalEditor.setCode(processedWithGain);
}

