"use client";
import React, { useState, useEffect } from "react";
import Thumbnails from "./thumbnails";

const VideoPlayer = ({ video, actions }) => {
  const [vdo, setvdo] = useState(video[0]);
  const [vdo_b, setvdo_b] = useState(video[0]);
  const [transitionRunning, setTransitionRunning] = useState(false);
  const [action, setAction] = useState(null);

  const handleVideoStart = () => {
    vdo.to != undefined ? setvdo_b(video[vdo.to]) : null;
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
    console.log(vdo.to);
    if (vdo?.to != undefined) {
      setTransitionRunning(true);
    } else {
      setTransitionRunning(false);
    }
  }, [vdo]);
  return (
    <div className="relative overflow-hidden w-screen h-screen">
      <div
        //  className="absolute  w-full  aspect-video "
        className="aspect-video w-96"
      >
        <video
          muted
          width={1920}
          height={1080}
          x5-playsinline
          playsInline
          disablePictureInPicture
          webkit-playsinline
          controlsList="nodownload nofullscreen noremoteplayback"
          autoPlay
          src={vdo.path}
          loop={vdo.loop}
          onPlaying={handleVideoStart}
          onEnded={handleVideoEnd}
        />
      </div>
      <div
        //  className="absolute  w-full  aspect-video "
        className="aspect-video w-96"
      >
        <video
          muted
          width={1920}
          height={1080}
          x5-playsinline
          playsInline
          disablePictureInPicture
          webkit-playsinline
          controlsList="nodownload nofullscreen noremoteplayback"
          autoPlay
          src={vdo_b.path}
          loop={true}
        />
      </div>

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
