"use client";

import { useEffect, useRef } from "react";

const sampleVideo = "/videos/sample.mp4";
const VideoPlayer = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const video = videoRef.current;

    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const drawFrame = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      video.requestVideoFrameCallback(drawFrame);
    };
    video.requestVideoFrameCallback(drawFrame);
  }, []);
  return (
    <>
      <video
        ref={videoRef}
        className="w-96 aspect-video"
        muted
        x5-playsinline
        playsInline
        disablePictureInPicture
        webkit-playsinline
        
        controlsList="nodownload nofullscreen noremoteplayback"
        autoPlay
        src={sampleVideo}
      />
      <canvas ref={canvasRef} width={384} height={216} />
    </>
  );
};

export default VideoPlayer;
