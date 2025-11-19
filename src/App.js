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
import { Preprocess, AddGainIfMissing} from './utils/PreprocessLogic';
import  LocalSongControls from './Components/LocalSongControls';
import InstrumentCheckboxes from './Components/InstrumentCheckBoxes';
import { BarChart } from './utils/D3Graph';



let globalEditor = null;


export default function StrudelDemo() {

    const hasRun =  useRef(false);
    const [volume, setVolume] = useState(1);

    //Run This First
    const[state, setState] = useState("stop");

    const [songText, setSongText] = useState(() => {
        const saved = localStorage.getItem("savedSongText");
        return saved || stranger_tune; //return either saved if it is saved or the tune origially loaded.
    });

    const handlePlay = () => {
        let outputText = Preprocess({ inputText: songText, volume });
        outputText = AddGainIfMissing(outputText, volume);
        globalEditor.setCode(outputText);
        globalEditor.evaluate();
    }   

    const handleStop = () => {
        globalEditor.stop();
    }

    const handleProc = () => {
        Proc(globalEditor, songText, volume);
    }

    const handleD3Data = (event) => {
        console.log(event.detail);
    };

    const handleProcAndPlay = () => {
        ProcAndPlay(globalEditor, songText, volume);
    }
   
    const handlePreprocess = () => {
        const outputText = AddGainIfMissing(Preprocess({ inputText: songText, volume }), volume);
        if (globalEditor != null) 
            {
                globalEditor.setCode(outputText);
            }
        console.log("Testing");
    };
    

    useEffect(() => {
        if (state === "play"){
            handlePlay();
        }
    }, [volume])

//Runs Once on Setup, then never again
useEffect(() => {
    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true; //I know i moved this last night, yet i dont see any reason to move it around, so am placing
        

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
            
        document.getElementById('proc').value = songText;
        globalEditor.setCode(songText);
        // SetupButtons()
        // Proc()
    }
    
}, []); 


return (
    <div>
        <h2 className="CenterText "> David's Strudel-Demo!</h2>
        <main className="">
            <div className="container-fluid ">
                <div className="row ">
                    <div className="col-md-8 DarkGreyBg borders" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                        <PreprocessTextArea value={songText} onChange={(newValue) => setSongText(newValue)}/>
                    </div>
                    <div className="col-md-4">

                        <nav>
                            <div className='button_container_2'>
                                <h1 className="TitleButtons"> DJ Controls</h1>
                                <div className='QuickAdjustment DarkGreyBg'>
                                    <PlayButtons onPlay={() => { setState("play"); handlePlay()}} onStop={() => { setState("stop"); handleStop()}}   />
                                    <div className="">
                                        <LocalSongControls songText={songText} setSongText={setSongText} globalEditor={globalEditor} />
                                    </div>
                                </div>
                                <br ></br>
                                <div className="borders DarkGreyBg">
                                    <BarChart/>
                                </div>

                            </div>
                        </nav>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-8 borders blackbg" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                    <br></br>
                    <br></br>
                    
                    <div className="col-md-4"> 
                        <br>
                        </br>
                        <div className="AllButBottomBorder text-center greyBG">
                            <h2 className=""  style={{ margin: 0 }}>Change The BPM!</h2>
                        </div>
                        <div className='AllButTopBorder ChangingBGLightGrey '>
                            
                            <DJ_Controls songText={songText} setSongText={setSongText} globalEditor={globalEditor} VolumeChange={volume} onVolumeChange={(e) => setVolume(parseFloat(e.target.value))}/>
                            
                            <h2 className='CenterText TopBorderOnly greyBG' style={{ margin: 0 }}>Mute Instruments</h2>
                            <InstrumentCheckboxes inputText={songText} onChange={(updatedText) => setSongText(updatedText)} />

                        </div>

                    </div>

                    
                </div>
            </div>
            <br>
            </br>
            <div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
                    <h1 className="CanvasHeading">Canvas!!</h1>
                    <canvas id="roll" className="Graphing borders "></canvas>
                </div>
            </div>
 
        </main >
    </div >
);


}