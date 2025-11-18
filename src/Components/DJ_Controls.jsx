function DJ_Controls({songText, setSongText, globalEditor, volume, onVolumeChange}) {
    //e is the event that react automatically passe to the function when spmething happens, like onchange of the BPM.
    //It means that I am able to access the element, aka the BPM input beign changed, and assinge it to a variable.
    function BPMChange(e){
        const newBPM = e.target.value;

        //Was on the following website and found something called REGEX, allows me to access and manipulate a string? https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
        //https://stackoverflow.com/questions/10965433/regex-replace-multi-line-breaks-with-single-in-javascript
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet


        // Forward slash and backslash match it exactly, the s matches the whites spaces, and d matches the number
        const newSongText = songText.replace(/setcps\([^)]*\)/, `setcps(${newBPM}/60/4)`);
        setSongText(newSongText);
    }




    return (
        <>
        <div className="input-group mb-3">
            <span className="input-group-text" id="cpm-label">Set BPM</span>
            <input type="text" onChange={BPMChange} className="form-control" id="cpm_text_input" placeholder="120" aria-label="Username" defaultValue={120} aria-describedby="cpm_label"/>
        </div>

            <label htmlFor="range3" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="2" step="0.1" id="volume_range" onMouseUp={onVolumeChange}></input>
        </>
    );
}

export default DJ_Controls

