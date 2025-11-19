
                    
function PreprocessTextArea({value, onChange}) {
    return (
        <div className="CenterText Bold">
            <label htmlFor="proc" className="CenterText ">Modify Your Song Text Below!</label>
            <textarea className="form-control" rows="15" value={value} onChange={(e) => onChange(e.target.value)} id="proc" ></textarea>
        </div>
    );
}

export default PreprocessTextArea