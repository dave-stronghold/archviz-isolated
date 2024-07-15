'use client'
import React, { useEffect, useRef } from "react";

const PrefetchVideos = ({ videoUrls }) => {
  const prefetched = useRef(false);

  useEffect(() => {
    if (prefetched.current) return; // Prevent refetching

    videoUrls.forEach((videoUrl) => {
      fetch(videoUrl, {
        method: "GET",
        headers: {
          "Content-Type": "video/mp4",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.blob();
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          console.log(`Prefetched and cached: ${url}`);
          // Optionally revoke the object URL if you don't need it
          // window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("Failed to prefetch video:", error);
        });
    });

    prefetched.current = true; // Mark as prefetched
  }, [videoUrls]);

  return (
    <>
      {/* <div>Videos are being prefetched...</div> */}
    </>
  );
};

export default PrefetchVideos;
