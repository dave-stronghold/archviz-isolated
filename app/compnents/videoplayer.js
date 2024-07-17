"use client";
import React, { useState, useEffect } from "react";
import Thumbnails from "./thumbnails";

const VideoPlayer = ({ video, actions }) => {
  const [vdo, setvdo] = useState(video[0]);
  const [vdo_b, setvdo_b] = useState(video[0]);
  const [transitionRunning, setTransitionRunning] = useState(false);
  const [action, setAction] = useState(null);

  const handleVideoStart = () => {
    vdo.to!=undefined?setvdo_b(video[vdo.to]):null;
 
  };
  const handleVideoEnd = () => {
 
    setvdo(video[vdo.to]);
  };

  const handleAction = (action) => {
    if (action?.transitions[vdo?.type]) {
      setvdo(video[action?.transitions[vdo?.type]]);
    }
    setAction(action);
  };

  useEffect(() => {
    console.log(vdo.to)
    if (vdo?.to != undefined) {
      setTransitionRunning(true);
    } else {
      setTransitionRunning(false);
    }
  }, [vdo]);
  return (
    <div className="relative overflow-hidden w-screen h-screen">
      <video
        muted
        x5-playsinline=""
        playsInline
        disablePictureInPicture
        webkit-playsinline=""
        controlsList="nodownload nofullscreen noremoteplayback"
        autoPlay
        className="absolute aspect-video w-full"
        // className=" aspect-video w-96"
        src={vdo.path}
        loop={vdo.loop}
        onPlaying={handleVideoStart}
        onEnded={handleVideoEnd}
      />
      <video
        muted
        x5-playsinline=""
        playsInline
        disablePictureInPicture
        webkit-playsinline=""
        controlsList="nodownload nofullscreen noremoteplayback"
        autoPlay
        // className=" aspect-video w-96"
        className=" aspect-video w-full"
        src={vdo_b.path}
        loop={true}
      />

      <div className="absolute top-0 w-1/2">
        <Thumbnails
          actions={actions}
          handleAction={handleAction}
          transitionRunning={transitionRunning}
        />
        <div className="hidden md:block">
          <div className="text-fuchsia-400">
            {vdo.type ? vdo.type : "Transition"}
          </div>
          <div>{transitionRunning.toString()}</div>
          <div className=" text-yellow-200">
            {JSON.stringify(action?.transitions[vdo.type])}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
