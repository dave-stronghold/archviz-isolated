"use client";

import { useEffect, useRef } from "react";

const sampleVideo = "/videos/sample.webm";
const VideoPlayer = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const video = videoRef.current;

    ctx.fillStyle = "blue";
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
        className="w-96 aspect-video "
        muted
        x5-playsinline
        playsInline
        disablePictureInPicture
        webkit-playsinline
        loop
        controlsList="nodownload nofullscreen noremoteplayback"
        autoPlay
        // src={sampleVideo}
        src='/videos/test2.mp4'
        // src='/videos/swimming_pool/Swim_2-hero_2.mp4'
      />
      <canvas ref={canvasRef} width={384} height={216} />
      {/* <video src='/videos/test.mp4' width={400} controls autoPlay loop muted playsInline></video> */}
    </>
  );
};

export default VideoPlayer;
