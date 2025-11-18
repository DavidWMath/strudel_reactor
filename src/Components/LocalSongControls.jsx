

export default function LocalSongControls({ songText, setSongText, globalEditor }) {

    const saveSongToLocal = () => {
        localStorage.setItem("savedSongText", songText);
        console.log("song saved locally");
    };

    const getLocalSong = () => {
        const saved = localStorage.getItem("savedSongText");
        if (saved) {
            setSongText(saved);              
            if (globalEditor) globalEditor.setCode(saved);  
            console.log("loaded saved song");
        } else {
            console.log("no saved song found");
        }
    };


    return (
        <div className="local-song-controls">
        <button class="btn btn-warning" onClick={saveSongToLocal}>
            Save Song Locally
        </button>
        <button className="btn btn-warning btn-outline-dark" onClick={getLocalSong}>
            Get Local Song
        </button>
        </div>
    );

        

}