// components/AudioPlayer.js
import { useEffect, useState, useRef } from "react";

// Music by https://www.bensound.com
// License code: A9CWKP9RGP0AHRBA

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Lorsque la musique est jouée, répéter la lecture
    if (audioRef.current) {
      audioRef.current.loop = true;
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center gap-2 bg-white bg-opacity-60 rounded-xl backdrop-blur-md px-4 py-2 absolute top-3 md:top-4 right-[30vw] md:right-[9vw] z-50 cursor-pointer hover:drop-shadow-2xl duration-300">
      <button onClick={togglePlay} className=" w-full h-full">
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className=" size-5"
          >
            <path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            className=" size-5"
          >
            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
          </svg>
        )}
      </button>
      <audio ref={audioRef} src="/audio/music.mp3" autoPlay />
    </div>
  );
};

export default AudioPlayer;
