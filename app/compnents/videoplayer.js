"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Thumbnails from "./thumbnails";

const VideoPlayer = ({ video, actions }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(video[0]);
  const [transitionRunning, setTransitionRunning] = useState(false);
  const [paintCount, setPaintCount] = useState(0);
  const [startTime, setStartTime] = useState(0.0);
  const fpsInfoRef = useRef(null);
  const metadataInfoRef = useRef(null);
  const requestIdRef = useRef(null); // To store the requestId of the callback
  const [action, setAction] = useState(null);
  const updateCanvas = useCallback(
    (now, metadata) => {
      const videoElement = videoRef.current;
      const canvasElement = canvasRef.current;
      const ctx = canvasElement.getContext("2d");

      if (startTime === 0.0) {
        setStartTime(now);
      }

      ctx.drawImage(
        videoElement,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      const elapsed = (now - startTime) / 1000.0;
      const fps = ((paintCount + 1) / elapsed).toFixed(3);
      if (fpsInfoRef.current) {
        fpsInfoRef.current.innerText = `video fps: ${fps}`;
      }
      if (metadataInfoRef.current) {
        metadataInfoRef.current.innerText = JSON.stringify(metadata, null, 2);
      }

      setPaintCount(paintCount + 1);
      requestIdRef.current =
        videoElement.requestVideoFrameCallback(updateCanvas);
    },
    [startTime, paintCount]
  );

  useEffect(() => {
    if ("requestVideoFrameCallback" in HTMLVideoElement.prototype) {
      const videoElement = videoRef.current;
      requestIdRef.current =
        videoElement.requestVideoFrameCallback(updateCanvas);

      return () => {
        // Clean up the callback
        if (requestIdRef.current) {
          videoElement.cancelVideoFrameCallback(requestIdRef.current);
        }
      };
    } else {
      alert("Your browser does not support requestVideoFrameCallback().");
    }
  }, [updateCanvas]);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleLoadedData = () => {
      videoElement.play();
      setPaintCount(0); // Reset paint count
      setStartTime(0.0); // Reset start time
    };

    videoElement.addEventListener("loadeddata", handleLoadedData);

    // Initial setup to play the video
    videoElement.play();

    return () => {
      videoElement.removeEventListener("loadeddata", handleLoadedData);
    };
  }, []);

  const changeVideo = (newVideo) => {
    const videoElement = videoRef.current;
    videoElement.onloadeddata = () => {
      setPaintCount(0); // Reset paint count
      setStartTime(0.0);
      videoElement.style.display = "hidden"; // Reset start time
      videoElement.play();
    };

    // Change the source of the main video element
    // videoElement.src = newVideo;
    setCurrentVideo(newVideo);
  };

  const handleVideoEnd = () => {
    setCurrentVideo(video[currentVideo.to]);
  };

  const handleAction = (action) => {
    if (action?.transitions[currentVideo?.type]) {
      setCurrentVideo(video[action?.transitions[currentVideo?.type]]);
    }
    setAction(action);
  };
  useEffect(() => {
    if (currentVideo?.to != undefined) {
      setTransitionRunning(true);
    } else {
      setTransitionRunning(false);
    }
  }, [currentVideo]);
  return (
    <div className="relative overflow-hidden w-screen h-screen">
      <canvas
        className="aspect-video w-full absolute"
        ref={canvasRef}
        width={1920}
        height={1080}
      ></canvas>
      <video
      width={0}
      height={0}
        muted
        x5-playsinline
        playsInline
        disablePictureInPicture
        webkit-playsinline
        controlsList="nodownload nofullscreen noremoteplayback"
        autoPlay
        className="hidden opacity-0"
        ref={videoRef}
        src={currentVideo.path}
        loop={currentVideo.loop}
        onEnded={handleVideoEnd}
      ></video>
      <div className="hidden">
        {video.map((video, index) => (
          <button
            className="p-1 m-1 bg-blue-800"
            key={index}
            onClick={() => changeVideo(video)}
          >
            V{index + 1}
          </button>
        ))}
      </div>
      <div className="absolute top-0 w-1/2">
        <Thumbnails
          actions={actions}
          handleAction={handleAction}
          transitionRunning={transitionRunning}
        />
        <div className="hidden md:block">
          <div className="text-fuchsia-400">
            {currentVideo.type ? currentVideo.type : "Transition"}
          </div>
          <div>{transitionRunning.toString()}</div>
          <div className=" text-yellow-200">
            {JSON.stringify(action?.transitions[currentVideo.type])}
          </div>
          <div className="mt-2">
            <div ref={fpsInfoRef}></div>
            <pre ref={metadataInfoRef}></pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
