const songs = [
    {
        title: "Swim",
        artist: "Chase Atlantic",
        src: "songs/Chase_Atlantic_-_Swim_(MP3.cc).mp3"
    },

    {
        title: "Haunted",
        artist: "Isabel LaRosa",
        src: "songs/Isabel_Larose_-_Haunted_(MP3.cc).mp3"
    },

    {
        title: "Starboy",
        artist: "The Weeknd, Daft Punk",
        src: "songs/Starboy_-_The_Weeknd_(MP3.cc).mp3"
    },

    {
        title: "Aliens",
        artist: "BTS",
        src: "songs/Bts_-_Aliens_(MP3.cc).mp3"
    },

    {
        title: "No Doubt",
        artist: "ENHYPEN",
        src: "songs/Enhypen_-_No_Doubt_(MP3.cc).mp3"
    },

    {
        title: "Louder Than Bombs",
        artist: "BTS",
        src: "songs/Bts_-_Louder_Than_Bombs_(MP3.cc).mp3"
    },

    {
        title: "MOMMAE (Feat. Ugly Duck)",
        artist: "Jay Park, Ugly Duck",
        src: "songs/Jay_Park_-_Mommae_(MP3.cc).mp3"
    },

    {
        title: "like JENNIE",
        artist: "JENNIE",
        src: "songs/Jennie_-_Like_Jennie_(MP3.cc).mp3"
    },

    {
        title: "BTBT",
        artist: "B.I, Soulja Boy, DeVita",
        src: "songs/B.i_Soulja_Boy_Feat._Devita_-_Btbt_(MP3.cc).mp3"
    },

    {
        title: "VERY NICE",
        artist: "Seventeen",
        src: "songs/Seventeen_-_Very_Nice_(MP3.cc).mp3"
    },

    {
        title: "ANTIFRAGILE",
        artist: "LE SSERAFIM",
        src: "songs/Le_Sserafim_-_Antifragile_(MP3.cc).mp3"
    },

    {
        title: "PS5",
        artist: "Salem Ilese, TXT",
        src: "songs/Salem_Ilese_-_Ps5_With_Yeonjun_Taehyun_Of_Txt_Feat._Alan_Walker_(MP3.cc).mp3"
    },

    {
        title: "Darl+ing",
        artist: "Seventeen",
        src: "songs/Seventeen_-_Darl_Ing_(MP3.cc).mp3"
    },

    {
        title: "SHOUT OUT",
        artist: "ENHYPEN",
        src: "songs/Enhypen_-_Shout_Out_(MP3.cc).mp3"
    },

    {
        title: "BOUNCY",
        artist: "ATEEZ",
        src: "songs/Ateez_-_Bouncy_(MP3.cc).mp3"
    },

    {
        title: "Love Killa",
        artist: "MONSTA X",
        src: "songs/Monsta_X_-_Love_Killa_Mv_(MP3.cc).mp3"
    },

    {
        title: "BAD",
        artist: "ATEEZ",
        src: "songs/Ateez_-_Bad_(MP3.cc).mp3"
    },

    {
        title: "House of Cards",
        artist: "BTS",
        src: "songs/Bts_-_House_Of_Cards_Full_Length_Edition_(MP3.cc).mp3"
    },

    {
        title: "Epiphany",
        artist: "Jin (BTS)",
        src: "songs/Bts_-_Epiphany_Jin_s_Solo_(MP3.cc).mp3"
    },

    {
        title: "Runaway",
        artist: "AURORA",
        src: "songs/Aurora_-_Aurora_Runaway_(MP3.cc).mp3"
    }
];


const audio = document.getElementById("audio");

const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");

const playlist = document.getElementById("playlist");
const autoplay = document.getElementById("autoplay");

const albumArt = document.querySelector(".album-art");

let songIndex = 0;


function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;
    artist.textContent = song.artist;

    audio.src = song.src;

    progress.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";

    updatePlaylist();
}


function playSong() {

    audio.play()
        .then(() => {

            playBtn.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

            albumArt.classList.add("playing");

        })
        .catch(error => {

            console.error("Audio could not play:", error);

        });
}


function pauseSong() {

    audio.pause();

    playBtn.innerHTML =
        '<i class="fa-solid fa-play"></i>';

    albumArt.classList.remove("playing");
}


playBtn.addEventListener("click", () => {

    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }

});


function nextSong() {

    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();
}


function previousSong() {

    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);
    playSong();
}


nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", previousSong);


audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const percentage =
        (audio.currentTime / audio.duration) * 100;

    progress.value = percentage;

    currentTime.textContent =
        formatTime(audio.currentTime);

});


audio.addEventListener("loadedmetadata", () => {

    duration.textContent =
        formatTime(audio.duration);

});


function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    const minutes =
        Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60);

    return `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
}


progress.addEventListener("input", () => {

    if (!audio.duration) return;

    audio.currentTime =
        (progress.value / 100) *
        audio.duration;

});


volume.addEventListener("input", () => {

    audio.volume = Number(volume.value);

});


audio.addEventListener("ended", () => {

    if (autoplay.checked) {
        nextSong();
    } else {
        pauseSong();
    }

});


function createPlaylist() {

    playlist.innerHTML = "";

    songs.forEach((song, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="song-number">
                ${index + 1}
            </span>

            <span class="song-icon">
                <i class="fa-solid fa-music"></i>
            </span>

            <div class="song-details">

                <div class="song-name">
                    ${song.title}
                </div>

                <div class="song-artist">
                    ${song.artist}
                </div>

            </div>
        `;

        li.addEventListener("click", () => {

            songIndex = index;

            loadSong(songIndex);

            playSong();

        });

        playlist.appendChild(li);

    });

}


function updatePlaylist() {

    const items =
        playlist.querySelectorAll("li");

    items.forEach((item, index) => {

        if (index === songIndex) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }

    });

}


document.addEventListener("keydown", (event) => {

    if (event.code === "Space") {

        event.preventDefault();

        if (audio.paused) {
            playSong();
        } else {
            pauseSong();
        }

    }

    if (event.code === "ArrowRight") {
        nextSong();
    }

    if (event.code === "ArrowLeft") {
        previousSong();
    }

});


createPlaylist();

loadSong(songIndex);

audio.volume = 1;