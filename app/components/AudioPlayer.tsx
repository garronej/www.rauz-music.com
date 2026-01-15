"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type Track = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audioSrc: string;
};

type AudioPlayerLabels = {
  sectionLabel: string;
  title: string;
  description: string;
  nowPlaying: string;
  play: string;
  pause: string;
  previous: string;
  next: string;
  trackList: string;
  seek: string;
};

type AudioPlayerProps = {
  tracks: Track[];
  labels: AudioPlayerLabels;
};

const formatTime = (value: number) => {
  if (!Number.isFinite(value) || value <= 0) {
    return "0:00";
  }
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function AudioPlayer({ tracks, labels }: AudioPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const shouldAutoPlay = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = tracks[currentIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) {
      return;
    }

    audio.src = currentTrack.audioSrc;
    audio.load();
    setCurrentTime(0);
    setDuration(0);

    if (shouldAutoPlay.current) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
      shouldAutoPlay.current = false;
    } else {
      setIsPlaying(false);
    }
  }, [currentTrack?.audioSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || tracks.length === 0) {
      return;
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };
    const handleLoaded = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      shouldAutoPlay.current = true;
      setCurrentIndex((index) => (index + 1) % tracks.length);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [tracks.length]);

  if (!currentTrack) {
    return null;
  }

  const progress = duration ? Math.min(100, (currentTime / duration) * 100) : 0;

  const handlePlayToggle = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
  };

  const handleSelectTrack = (index: number) => {
    if (index === currentIndex) {
      void handlePlayToggle();
      return;
    }

    shouldAutoPlay.current = true;
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    shouldAutoPlay.current = true;
    setCurrentIndex((index) => (index - 1 + tracks.length) % tracks.length);
  };

  const handleNext = () => {
    shouldAutoPlay.current = true;
    setCurrentIndex((index) => (index + 1) % tracks.length);
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    const nextTime = Number(event.target.value);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return (
    <div className="glass-card audio-player p-6 md:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            {labels.sectionLabel}
          </p>
          <h3 className="font-display text-3xl text-[color:var(--foreground)]">
            {labels.title}
          </h3>
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
            {labels.description}
          </p>
        </div>
        <div className="audio-controls">
          <button
            className="audio-control"
            type="button"
            onClick={handlePrevious}
            aria-label={labels.previous}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
            >
              <rect x="4" y="5" width="2" height="14" rx="1" />
              <path d="M19 7l-8 5 8 5V7Z" />
            </svg>
          </button>
          <button
            className="audio-control audio-control-main"
            type="button"
            onClick={handlePlayToggle}
            aria-label={isPlaying ? labels.pause : labels.play}
          >
            {isPlaying ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M7 5a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1Zm10 0a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1Z" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M7 5.5a1 1 0 0 1 1.6-.8l9 6.5a1 1 0 0 1 0 1.6l-9 6.5A1 1 0 0 1 7 18.5v-13Z" />
              </svg>
            )}
          </button>
          <button
            className="audio-control"
            type="button"
            onClick={handleNext}
            aria-label={labels.next}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
            >
              <path d="M5 7l8 5-8 5V7Z" />
              <rect x="18" y="5" width="2" height="14" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      <div className="audio-now">
        <div className="flex flex-col gap-1">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            {labels.nowPlaying}
          </p>
          <p className="text-xl font-semibold text-[color:var(--foreground)]">
            {currentTrack.title}
          </p>
          <p className="text-sm text-[color:var(--muted)]">{currentTrack.artist}</p>
        </div>
        <div className="audio-cover-large">
          <Image
            src={currentTrack.cover}
            alt={`${currentTrack.title} cover`}
            width={140}
            height={140}
            className="h-full w-full object-cover"
            sizes="(min-width: 768px) 140px, 120px"
          />
        </div>
      </div>

      <div className="audio-progress">
        <span className="audio-time">{formatTime(currentTime)}</span>
        <label className="audio-range">
          <span className="sr-only">{labels.seek}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            style={{ "--progress": `${progress}%` } as CSSProperties}
          />
        </label>
        <span className="audio-time">{formatTime(duration)}</span>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
          {labels.trackList}
        </p>
        <div className="audio-tracklist">
          {tracks.map((track, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={track.id}
                className={`audio-track ${isActive ? "is-active" : ""}`}
                type="button"
                onClick={() => handleSelectTrack(index)}
                aria-pressed={isActive && isPlaying}
              >
                <span className={`audio-indicator ${isActive ? "is-active" : ""}`}>
                  {isActive && isPlaying ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                    >
                      <path d="M7 6a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1Zm10 0a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1Z" />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                    >
                      <path d="M8 6.5a1 1 0 0 1 1.6-.8l7 5a1 1 0 0 1 0 1.6l-7 5A1 1 0 0 1 8 16.5v-10Z" />
                    </svg>
                  )}
                </span>
                <div className="audio-cover">
                  <Image
                    src={track.cover}
                    alt={`${track.title} cover`}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 768px) 80px, 64px"
                  />
                </div>
                <div className="audio-track-info">
                  <p className="audio-track-title">{track.title}</p>
                  <p className="audio-track-artist">{track.artist}</p>
                </div>
                <span className="audio-track-time">
                  {isActive && duration ? formatTime(duration) : "--:--"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <audio ref={audioRef} preload="metadata" />
    </div>
  );
}
