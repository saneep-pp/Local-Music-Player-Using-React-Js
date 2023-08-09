import React, { useState, useRef } from "react";
import play from "../icons/play.png";
import stop from "../icons/stop.png";
const LocalMusicPlayer = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerKey, setPlayerKey] = useState(0);

  const audioRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setAudioFiles(selectedFiles);
    setCurrentFileIndex(0);
    setIsPlaying(true);
    setPlayerKey(playerKey + 1);
  };

  const togglePlay = () => {
    const audioElement = audioRef.current;
    if (!audioElement) {
      window.alert("There is No Musics to play..!");
      window.location.reload(false);
    }
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }

    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (currentFileIndex < audioFiles.length - 1) {
      setCurrentFileIndex(currentFileIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="local-music-player" key={playerKey}>
      <h1>Local Music Player</h1>
      <div className="container">
        <input
          type="file"
          accept="audio/*"
          multiple
          onChange={handleFileChange}
        />
        {audioFiles.length > 0 && (
          <>
            <audio
              ref={audioRef}
              controls
              autoPlay={isPlaying}
              onEnded={playNext}
              src={URL.createObjectURL(audioFiles[currentFileIndex])}
            >
              Your browser does not support the audio element.
            </audio>
            <p>
              <span>Playing</span>
              <marquee>{audioFiles[currentFileIndex].name}</marquee>
            </p>
          </>
        )}
        <button onClick={togglePlay}>
          {isPlaying ? <img src={stop}></img> : <img src={play}></img>}
        </button>
      </div>
    </div>
  );
};

export default LocalMusicPlayer;
