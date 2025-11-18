

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

 
    //gap-3 does a gap between buttons
    return (
        <div className="local-song-controls">
            <div className="local-song-controls d-flex justify-content-center gap-3 my-3"> 
                <button class="btn btn-warning btn-2circle  btn-bordered" onClick={saveSongToLocal}>
                    Save Song Locally
                </button>
                <button className="btn btn-warning btn-2circle  btn-bordered" onClick={getLocalSong}>
                    Get Local Song
                </button>
            </div>
            
  
        </div>
    );

        

}