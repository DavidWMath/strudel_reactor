import { Proc } from "../Functions/Proc";
import { ProcAndPlay } from "../Functions/ProcAndPlay";


function ProcButtons({globalEditor, onProc, onProcAndPlay}) {
    return (
        <>
            <div className="button_container">
                <div className="btn-group"  role="group" aria-label="basic mixed styles example">
                    <button id="process_play" className="Stop_Button" onClick={onProcAndPlay}>Proccess The SongText!</button>
                </div>
            </div>
        </>
        
    );
}

export default ProcButtons