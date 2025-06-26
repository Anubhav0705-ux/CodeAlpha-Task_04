    const songs = [
      {
        title: "Daylight",
        artist: "David",
        src: "songs/daylight.mp3",
        cover: "album_picture.jpg"
      },
      {
        title: "Sunflower",
        artist: "Post Malone",
        src: "songs/sunflower.mp3",
        cover: "mx2.jpg"
      },
      {
        title: "Until I Found You",
        artist: "Stephen Sanchez",
        src: "songs/until.mp3",
        cover: "mx3.jpg"
      }
    ];

    let currentSong = 0;
    const audio = document.getElementById("audio");
    const playBtn = document.getElementById("play");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const progress = document.getElementById("progress");
    const currTime = document.getElementById("curr-time");
    const totTime = document.getElementById("tot-time");
    const title = document.getElementById("song-title");
    const artist = document.getElementById("artist");
    const cover = document.getElementById("cover");
    const volume = document.getElementById("volume");

    function loadSong(index) {
      const song = songs[index];
      title.textContent = song.title;
      artist.textContent = song.artist;
      cover.src = song.cover;
      audio.src = song.src;
    }

    function playSong() {
      audio.play();
      playBtn.classList.replace("fa-play", "fa-pause");
    }

    function pauseSong() {
      audio.pause();
      playBtn.classList.replace("fa-pause", "fa-play");
    }

    playBtn.addEventListener("click", () => {
      if (audio.paused) {
        playSong();
      } else {
        pauseSong();
      }
    });

    nextBtn.addEventListener("click", () => {
      currentSong = (currentSong + 1) % songs.length;
      loadSong(currentSong);
      playSong();
    });

    prevBtn.addEventListener("click", () => {
      currentSong = (currentSong - 1 + songs.length) % songs.length;
      loadSong(currentSong);
      playSong();
    });

    audio.addEventListener("loadedmetadata", () => {
      totTime.textContent = formatTime(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      progress.value = (audio.currentTime / audio.duration) * 100;
      currTime.textContent = formatTime(audio.currentTime);
    });

    progress.addEventListener("input", () => {
      audio.currentTime = (progress.value / 100) * audio.duration;
    });

    volume.addEventListener("input", () => {
      audio.volume = volume.value;
    });

    function formatTime(sec) {
      const minutes = Math.floor(sec / 60);
      const seconds = Math.floor(sec % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    loadSong(currentSong);
 