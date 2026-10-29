/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Volume2 } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
}

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&loop=1&playlist=${videoId}`}
          title="VÍDEO QUE PREPARAMOS PARA VOCÊ"
          className="w-full h-full border-0 absolute inset-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Preview do Vídeo"
            className="absolute inset-0 w-full h-full object-cover opacity-60 filter blur-[2px]"
          />
          <div className="absolute inset-0 bg-black/50" />
          <button
            onClick={handlePlay}
            className="relative z-10 btn-pulse-green flex flex-col items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-black px-6 py-5 rounded-2xl font-black text-lg sm:text-xl shadow-[0_0_35px_rgba(34,197,94,0.9)] border-2 border-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer max-w-[85%]"
          >
            <div className="bg-black text-green-400 p-3.5 rounded-full shadow-lg">
              <Volume2 className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
            </div>
            <span className="uppercase tracking-tight text-center font-black leading-tight">
              CLIQUE PARA ATIVAR O SOM
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
