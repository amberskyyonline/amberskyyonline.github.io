document.addEventListener("DOMContentLoaded", function () {
  var video_player = document.getElementById("video_player");
  var links = video_player.getElementsByTagName("a");
  video_player.tracks = [
    "vids/jdemo.mp4",
    "vids/hell2.mp4",
"vids/johnnyjungleterroristicsavior.mp4",
"vids/junglehonda.mp4",
"vids/spacefight.mp4",
"vids/nightdrive.mp4",
"vids/sanriohoes.mp4",
"vids/murda.mp4",
"vids/windy.mp4"
  ];
  video_player.remainingTracks = [];
  for (var i = 0; i < links.length; i++) {
    links[i].onclick = handler;
    //video_player.remainingTracks[i] = links[i].href;
  }
  for (var i = 0; i < video_player.tracks.length; i++) {
    //links[i].onclick = handler;
    video_player.remainingTracks[i] = video_player.tracks[i];
  }
  //video_player.remainingTracks = [...video_player.tracks];
  video_player.lastPlayed =
    "vids/jdemo.mp4";

  document.getElementById("playlist-next").onclick = randomNextTrack;

  function randomNextTrack() {
    console.log(video_player.remainingTracks.length);
    if (video_player.remainingTracks.length == 0) {
      console.log("emptied out");
      console.log(video_player.tracks);
      //video_player.remainingTracks = video_player.tracks;
      for (var i = 0; i < video_player.tracks.length; i++) {
        //links[i].onclick = handler;
        video_player.remainingTracks[i] = video_player.tracks[i];
      }
    }
    console.log(video_player.remainingTracks);
    //for (var i=links.length; i>0; i--) {
    var nextTrack = video_player.lastPlayed;
    while (nextTrack == video_player.lastPlayed) {
      var random = randomNumber(video_player.remainingTracks.length);
      var nextTrack = video_player.remainingTracks[random];
    }
    video_player.remainingTracks.splice(random, 1);
    console.log(nextTrack);
    //console.log(video_player.remainingTracks);
    playVideo(nextTrack);
    //}
  }

  function randomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function playVideo(videoSrc) {
    video = document.querySelector("#video_player video");
    //video.removeAttribute("controls");
    //video.removeAttribute("poster");
    source = document.querySelectorAll("#video_player video source");
    source[0].src = videoSrc;
    //source[1].src = filename + ".webm";
    video.load();
    video.play();
    video_player.lastPlayed = videoSrc;
  }

  function handler(e) {
    e.preventDefault();
    videotarget = this.getAttribute("href");
    filename =
      videotarget.substr(0, videotarget.lastIndexOf(".")) || videotarget;
    videoSrc = filename + ".mp4";
    playVideo(videoSrc);
  }
});
