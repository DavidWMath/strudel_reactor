import { ProcessText } from "./ProcessText";


export function Proc(globalEditor, songText) {
    if (!songText){
        console.log("Proc and Play : No Song Text ");
    }

    if (!globalEditor){
        console.log("Proc and Paly : No global editor");
    }

  let proc_text = songText;
  let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText());
  globalEditor.setCode(proc_text_replaced);
}
