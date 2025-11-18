function PlayButtons({ onPlay, onStop }) {
  return (
    <div className="d-flex justify-content-center my-3 gap-3">
      <button type="button" className="btn btn-success btn-circle" onClick={onPlay}> Play </button>
      <button type="button" className="btn btn-danger btn-circle" onClick={onStop}> Stop </button>
    </div>
  );
}

export default PlayButtons;
