function PlayButtons() {
    return (
        <>
            <div class="button_container">
                <div className="btn-group"  role="group" aria-label="basic mixed styles example">
                    <button id="play" className="Stop_Button ">Play</button>
                    <button id="stop" className="Stop_Button">Stop</button>
                </div>
            </div>
        </>
    );
}

export default PlayButtons