import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope, songPtr } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJ_Controls from './Components/DJ_Controls';
import PlayButtons from './Components/PlayButtons';
import ProcButtons from './Components/ProcButtons';
import PreprocessTextArea from './Components/PreprocessTextArea';
import { ProcAndPlay } from './Functions/ProcAndPlay';
import { Proc } from './Functions/Proc';
import { ProcessText } from './Functions/ProcessText';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};





export default function StrudelDemo() {

    const [songText, setSongText] = useState(stranger_tune)

    const handlePlay = () => {
        globalEditor.evaluate();
    }

    const handleStop = () => {
        globalEditor.stop();
    }

    const handleProc = () => {
        Proc(globalEditor, songText);
    }

    const handleProcAndPlay = () => {
        ProcAndPlay(globalEditor, songText);
    }



const hasRun = useRef(false);

//Runs Once on Setup, then never again
useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
            
        document.getElementById('proc').value = stranger_tune
        // SetupButtons()
        // Proc()
    }
    globalEditor.setCode(songText);
}, [songText]);


return (
    <div>
        <h2>Strudel Demo</h2>
        <main>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <PreprocessTextArea defaultValue={songText} onChange={(e) => setSongText(e.target.value)}/>
                    </div>
                    <div className="col-md-4">

                        <nav>
                            <div className='button_container_2'>
                                <h1 className="TitleButtons"> DJ Controls</h1>
                                <ProcButtons onProc={handleProc} onProcAndPlay={handleProcAndPlay}/>  
                                <br />
                                <PlayButtons onPlay={handlePlay} onStop={handleStop}     />
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                    <div className="col-md-4">
                        <DJ_Controls songText={songText} setSongText={setSongText} globalEditor={globalEditor}/>
                    </div>
                </div>
            </div>
            <canvas id="roll" className="Graphing"></canvas>
        </main >
    </div >
);


}