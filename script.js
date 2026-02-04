  /* MUSIC */
let musicStarted = false;
function startMusic() {
    if (!musicStarted) {
        const music = document.getElementById("bgMusic");
        music.volume = 0.4;
        music.play();
        musicStarted = true;
    }
}

/* NO BUTTON */
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

let msgIndex = 0;

function handleNoClick() {
    startMusic();
    const noBtn = document.querySelector(".no-button");
    const yesBtn = document.querySelector(".yes-button");

    noBtn.textContent = messages[msgIndex];
    msgIndex = (msgIndex + 1) % messages.length;

    yesBtn.style.fontSize =
        (parseFloat(getComputedStyle(yesBtn).fontSize) * 1.4) + "px";
}

/* YES BUTTON */
function handleYesClick() {
    startMusic();
    launchFireworks();
    setTimeout(() => {
        window.location.href = "yes_page.html";
    }, 2200);
}

/* CONTINUOUS HEARTS */
function spawnHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (5 + Math.random() * 4) + "s";
    document.querySelector(".hearts").appendChild(heart);
    setTimeout(() => heart.remove(), 9000);
}
setInterval(spawnHeart, 300);

/* REAL FIREWORKS */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function launchFireworks() {
    let particles = [];
    const colors = ["#ff4d6d","#ffd166","#06d6a0","#4cc9f0","#c77dff"];

    for (let i = 0; i < 220; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 6 + 2,
            radius: Math.random() * 2 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 100
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.life--;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });

        particles = particles.filter(p => p.life > 0);
        if (particles.length) requestAnimationFrame(animate);
    }

    animate();
}
