const videoSection = () => {
  const vid = document.querySelector("video");
  const audio = document.querySelector("audio");
  vid.playbackRate = 0.9;

  document.querySelector("#toggle-video").addEventListener("click", (e) => {
    if (vid.paused) {
      vid.play();
      audio.play();
      e.currentTarget.innerHTML = "pause";
    } else {
      vid.pause();
      audio.pause();
      e.currentTarget.innerHTML = "play";
    }
  });
  return vid;
};
export default videoSection;
