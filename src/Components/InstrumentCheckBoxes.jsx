import { useState, useEffect } from "react";
import { getInstrumentTitles } from "../utils/PreprocessLogic";
import { ApplyInstrumentMute } from "../utils/PreprocessLogic";

export default function InstrumentCheckboxes({ inputText, onChange }) {
    const [instruments, setInstruments] = useState([]);
    const [muteStates, setMuteStates] = useState({});

    //get instruments from input text
    useEffect(() => {
        const instrs = getInstrumentTitles(inputText);
        setInstruments(instrs); //set them in the use state

        let newStates = {};
        for (let key in muteStates) {
            if (muteStates.hasOwnProperty(key)) { //if the instruments have a key, which they all should as they all come with one
                newStates[key] = muteStates[key]; //copy over the keys
            }
        }
        //add the new instruments
        for (let i = 0; i < instrs.length; i++) {
            const instr = instrs[i];
            if (!(instr in newStates)) { //if the instrument is not ticked yet in the states usestate.
                newStates[instr] = false; //make it false
            }
        }
        setMuteStates(newStates); //set them all to etiehr ticked or unticked based on the usestate
    }, [inputText]);


    //Handling toggle of instrument being ticked/unticked
    const handleToggle = (instr) => {
        let newStates = {};
        
        for (let key in muteStates) { //copy the keys
            if (muteStates.hasOwnProperty(key)) { //copy all the keys over if they have a key, which they all do, as they are unique
                newStates[key] = muteStates[key];
            }
        }

        if (newStates[instr] === true) {
            newStates[instr] = false; //set it to unticked
        } else {
            newStates[instr] = true;//set it too ticked
        }
        setMuteStates(newStates); //again apply

        //aply the muting
        const updatedText = ApplyInstrumentMute(inputText, newStates);
        onChange(updatedText);
    };

    //Like what the tutor has done.
    //the key is what the instrument name is essentially, like hashmaps which we have jsut finished an assingment on in
    return (
        <div>
            
        {instruments.map(instr => (
            <div key={instr}> 
            <input
                type="checkbox"
                checked={muteStates[instr]} //get the state of the checkbox based on the usestate.
                onChange={() => handleToggle(instr)} //handle the toggle when changed
            />
            {instr}
            </div>
        ))}
        </div>
    );
}
