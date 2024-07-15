import VideoPlayer from "./compnents/videoplayer";
import PrefetchVideos from "./PrefetchVideos";
import swimmingPoolData from "@/data/swimmingPoolData.json";
const videos = [
  "/videos/swimming_pool/hero_2-hero_2.mp4",
  "/videos/swimming_pool/hero_2-Swim_1.mp4",
  "/videos/swimming_pool/Swim_1-hero_2.mp4",
  "/videos/swimming_pool/Swim_1-Swim_1.mp4",
  "/videos/swimming_pool/hero_2-Swim_2.mp4",
  "/videos/swimming_pool/Swim_2-hero_2.mp4",
  "/videos/swimming_pool/Swim_2-Swim_2.mp4",
  "/videos/swimming_pool/Swim_2-Swim_1.mp4",
  "/videos/swimming_pool/Swim_1-Swim_2.mp4"
]

export default function Home() {
  return (
    <>
      <PrefetchVideos videoUrls={videos}/>
      <VideoPlayer video={swimmingPoolData.videos} actions={swimmingPoolData.actions} />
    </>
  );
}
