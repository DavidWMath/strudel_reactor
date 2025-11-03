function PlayButtons({onPlay, onStop}) {
    return (
        <>
            <div className="button_container">
                <div className="btn-group"  role="group" aria-label="basic mixed styles example">
                    <button id="play" className="Stop_Button" onClick={onPlay}>Play</button>
                    <button id="stop" className="Stop_Button" onClick={onStop}>Stop</button>
                </div>
            </div>
        </>
    );
}

export default PlayButtons