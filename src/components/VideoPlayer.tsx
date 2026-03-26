import React, { useRef, useEffect, useState } from 'react';
import { VideoData } from '../types';
import { SubtitleMode } from './SubtitlePanel';
import { Play, Pause, RotateCcw, FastForward, Volume2, Maximize, Subtitles } from 'lucide-react';
import { cn } from '../lib/utils';

interface VideoPlayerProps {
  video: VideoData;
  onTimeUpdate: (time: number) => void;
  seekTime: number | null;
  mode: SubtitleMode;
  onModeChange: (mode: SubtitleMode) => void;
}

export function VideoPlayer({ video, onTimeUpdate, seekTime, mode, onModeChange }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (seekTime !== null && videoRef.current) {
      videoRef.current.currentTime = seekTime;
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [seekTime]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      onTimeUpdate(current);
      setProgress((current / videoRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const currentSubtitle = video.subtitles.find(
    s => videoRef.current && videoRef.current.currentTime >= s.startTime && videoRef.current.currentTime < s.endTime
  );

  return (
    <div className="relative bg-black rounded-xl overflow-hidden shadow-xl aspect-video group">
      <video
        ref={videoRef}
        src={video.url}
        className="w-full h-full object-cover opacity-80"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
      />
      
      {/* Glass Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pt-12 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Progress Bar */}
        <div 
          className="w-full h-1.5 bg-white/20 rounded-full mb-6 cursor-pointer relative overflow-hidden"
          onClick={handleSeek}
        >
          <div 
            className="absolute top-0 left-0 h-full bg-primary rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-6">
            <button onClick={togglePlay} className="hover:scale-110 transition-transform">
              {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
            </button>
            <button 
              onClick={() => { if (videoRef.current) videoRef.current.currentTime -= 10; }}
              className="hover:scale-110 transition-transform"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
            <button 
              onClick={() => { if (videoRef.current) videoRef.current.currentTime += 30; }}
              className="hover:scale-110 transition-transform"
            >
              <FastForward className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5" />
              <div className="w-20 h-1 bg-white/30 rounded-full">
                <div className="w-2/3 h-full bg-white rounded-full"></div>
              </div>
            </div>
            
            <span className="text-sm font-medium font-headline tracking-wide">
              {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold font-headline transition-colors">
              1.0x
            </button>
            <button onClick={() => onModeChange(mode === 'off' ? 'bilingual' : 'off')}>
              <Subtitles className={cn("w-6 h-6 cursor-pointer transition-colors", mode !== 'off' ? "text-primary" : "hover:text-primary")} />
            </button>
            <Maximize className="w-6 h-6 cursor-pointer hover:text-primary transition-colors" />
          </div>
        </div>
      </div>

      {/* Overlay Subtitles (Active) */}
      {mode !== 'off' && currentSubtitle && (
        <div className="absolute bottom-24 left-0 right-0 text-center px-12 pointer-events-none">
          {(mode === 'bilingual' || mode === 'en') && (
            <p className="text-2xl font-bold text-white drop-shadow-lg font-headline">
              {currentSubtitle.en}
            </p>
          )}
          {(mode === 'bilingual' || mode === 'zh') && (
            <p className="text-lg text-white/80 font-medium mt-2 drop-shadow-md">
              {currentSubtitle.zh}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
