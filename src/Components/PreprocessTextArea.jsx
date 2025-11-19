
                    
function PreprocessTextArea({value, onChange}) {
    return (
        <div className="CenterText Bold DarkGreyBg">
            <label htmlFor="proc" className="CenterText  ">Modify Your Song Text Below!</label>
            <textarea className="form-control DarkGreyBg" rows="20" value={value} onChange={(e) => onChange(e.target.value)} id="proc" ></textarea>
        </div>
    );
}

export default PreprocessTextArea