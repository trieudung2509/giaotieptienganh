$(".btn-play").on("click", function () {
  const parent = $(this).parent();
  const video = parent.prev().get(0);
  const currentMaskVideo = $(this).parent().get(0);
  // pause all video
  const allVideos = $(".video-element");
  const allMaskVideo = $(".mask-video");
  for (let i = 0; i < allMaskVideo.length; i++) {
    const maskItem = allMaskVideo[i];
    maskItem.style.display = "flex";
  }
  for (let i = 0; i < allVideos.length; i++) {
    const element = allVideos[i];
    element.pause();
    element.removeAttribute("controls");
  }
  if (video) {
    video.play();
    video.setAttribute("controls", "");
    currentMaskVideo.style.display = "none";
  }
});
$(".video-element").on("click", function () {
  const video = $(this).get(0);
  const maskVideo = $(this).next()[0];
  maskVideo.style.display = "flex";
  if (video.paused) {
    video.play();
  } else {
    video.pause();
    video.removeAttribute("controls");
  }
});
