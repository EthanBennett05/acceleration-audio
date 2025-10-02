const audioPlayer = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const progressBar = document.getElementById("progress");
const customProgressBar = document.getElementById("custom-progress-bar");
const nextSongButton = document.getElementById("next-song");
const lastSongButton = document.getElementById("skip-back");
const songImage = document.getElementById("song-image");
const songPlaying = document.getElementById("song-playing");
const currentTimeHTML = document.getElementById("current-time");
const durationHTML = document.getElementById("duration")

let TimeStamp = 0;
let playbackSpeed = 1;

const baseURL = "/songs";
const imgURL = "/albumart";

let currentTrack = 0;

const songs = [
  { file: "CaliforniaGurlscopy.m4a", albumArt: "IMG_1585.png", name: "California Gurls - Nathan and Ethan (feat. Adam)"} ,
  { file: "All_IwantforChristmasIsYou.m4a", albumArt: "All_IWant.PNG", name: "All I Want For Christmas Is You - Nathan and Ethan (feat. Adam)"},
  { file: "Just_Give_me_a_reason.m4a", albumArt: "Trophy.jpeg", name: "Just Give Me a Reason - Nathan and Ethan"},//Some Ethan and Nathan originals
  { file: "Umbrella.m4a", albumArt: "IMG_0861.JPG", name: "Umbrella - Nathan and Ethan (feat. Adam, Robert, and Hunter)"},
  { file: "NoLoveInOklahoma.m4a", albumArt: "Spencer.jpg", name: "No Love in Oklahoma"},
  { file: "Aidan.mp3", albumArt: "Aidan.jpg", name: "Aidan" },
  { file: "autumn_sun.mp3", albumArt: "autumn_sun.png", name: "Autmun Sun"},
  { file: "best_part_of_me.mp3", albumArt: "BestPart.jpg", name: "Best Part Of Me"},
  { file: "Better Days - LAKEY INSPIRED.mp3", albumArt: "Better Days.jpg", name: "Better Days"}
];

document.addEventListener("DOMContentLoaded", () => {
  currentTrack = 0;
  
  audioPlayer.src = `${baseURL}/${songs[currentTrack].file}`;
  songImage.src = `${imgURL}/${songs[currentTrack].albumArt}`
  songPlaying.textContent = songs[currentTrack].name
  currentTimeHTML.textContent = audioPlayer.currentTime
  durationHTML.textContent = audioPlayer.duration
});


playButton.addEventListener("click", () => {
  console.log("play")
  audioPlayer.src = `${baseURL}/${songs[currentTrack].file}`;
  audioPlayer.load();
  audioPlayer.currentTime = TimeStamp;
  audioPlayer.playbackRate = playbackSpeed;
  audioPlayer.play();
  playButton.classList.add("hidden");
  pauseButton.classList.remove("hidden");
});

audioPlayer.addEventListener("ended", () => {
  NextSong();
  audioPlayer.pause();
  console.log("pause");
})

pauseButton.addEventListener("click", () => {
  console.log("pause");
  audioPlayer.pause();
  TimeStamp = audioPlayer.currentTime;
  playbackSpeed = audioPlayer.playbackRate;
  playButton.classList.remove("hidden");
  pauseButton.classList.add("hidden");
});

audioPlayer.addEventListener("timeupdate", () => {
  currentTimeHTML.textContent = formatTime(audioPlayer.currentTime);
});

audioPlayer.addEventListener("timeupdate", () => {
  customProgressBar.style.width = `${
    (audioPlayer.currentTime / audioPlayer.duration) * 100
  }%`;

  audioPlayer.playbackRate += 0.01;
});

document.addEventListener("keydown", (event) => {
  switch (event.key.toLowerCase()) {   
    case " ":
      event.preventDefault();
      audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
      break;

    case "m":
      audioPlayer.muted = !audioPlayer.muted;
      break;
  }
});


function NextSong() {
  TimeStamp = 0;
  playbackSpeed = 1;
  currentTrack++;
  if (currentTrack >= songs.length) {
    currentTrack = 0
  }
  audioPlayer.src = `${baseURL}/${songs[currentTrack].file}`;
  audioPlayer.load();
  playButton.classList.remove("hidden");
  pauseButton.classList.add("hidden");
  songImage.src = `${imgURL}/${songs[currentTrack].albumArt}`
  songPlaying.textContent = songs[currentTrack].name
  currentTimeHTML.textContent = audioPlayer.currentTime
  durationHTML.textContent = audioPlayer.duration
}

function BackSong() {
  TimeStamp = 0;
  playbackSpeed = 1;
  currentTrack--;
  if (currentTrack <= -1) {
    currentTrack = songs.length
  }
  audioPlayer.src = `${baseURL}/${songs[currentTrack].file}`;
  audioPlayer.load()
  playButton.classList.remove("hidden");
  pauseButton.classList.add("hidden");
  songImage.src = `${imgURL}/${songs[currentTrack].albumArt}`
  songPlaying.textContent = songs[currentTrack].name
  currentTimeHTML.textContent = audioPlayer.currentTime
  durationHTML.textContent = audioPlayer.duration
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  let minutes = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  if (secs < 10) secs = "0" + secs;
  return `${minutes}:${secs}`;
}

audioPlayer.addEventListener("loadedmetadata", () => {
  currentTimeHTML.textContent = formatTime(audioPlayer.currentTime);
  durationHTML.textContent = formatTime(audioPlayer.duration);
});

nextSongButton.addEventListener("click", () => {
    NextSong();
    audioPlayer.pause()
    console.log("Next Song")
  })

lastSongButton.addEventListener("click", ()=> {
    BackSong();
    audioPlayer.pause()
    console.log("Last Song")
  }
)