
                    
function PreprocessTextArea({value, onChange}) {
    return (
        <div className="Border">
            <label htmlFor="proc" className="ChangingBGLightGrey CenterText">Song Text!  :</label>
            <textarea className="form-control" rows="15" value={value} onChange={(e) => onChange(e.target.value)} id="proc" ></textarea>
        </div>
    );
}

export default PreprocessTextArea