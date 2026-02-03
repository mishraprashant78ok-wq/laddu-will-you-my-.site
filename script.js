 const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;
let musicStarted = false;

function startMusic() {
    if (!musicStarted) {
        const music = document.getElementById("bgMusic");
        music.volume = 0.4;
        music.play();
        musicStarted = true;
    }
}

function handleNoClick() {
    startMusic();

    const noButton = document.querySelector(".no-button");
    const yesButton = document.querySelector(".yes-button");

    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;

    const size = parseFloat(getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${size * 1.5}px`;
}

function handleYesClick() {
    startMusic();
    celebrateYes();

    setTimeout(() => {
        window.location.href = "yes_page.html";
    }, 1800);
}

/* Hearts */
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (6 + Math.random() * 4) + "s";
    document.querySelector(".hearts").appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 500);

/* Confetti */
function celebrateYes() {
    const confetti = document.getElementById("confetti");
    const colors = ["#ff4d6d", "#ffd166", "#06d6a0", "#4cc9f0", "#c77dff"];

    for (let i = 0; i < 120; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti-piece";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.top = Math.random() * 20 + "vh";
        piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
        confetti.appendChild(piece);
        setTimeout(() => piece.remove(), 3000);
    }
}

