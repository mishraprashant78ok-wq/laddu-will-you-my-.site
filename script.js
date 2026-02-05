 /* MUSIC */
let musicStarted = false;
function startMusic() {
    if (!musicStarted) {
        bgMusic.volume = 0.4;
        bgMusic.play();
        musicStarted = true;
    }
}

/* HEARTS */
function spawnHeart() {
    const h = document.createElement("div");
    h.className = "heart";
    h.style.left = Math.random() * 100 + "vw";
    h.style.animationDuration = (6 + Math.random() * 4) + "s";
    document.querySelector(".hearts").appendChild(h);
    setTimeout(() => h.remove(), 10000);
}
setInterval(spawnHeart, 350);

/* NO button */
const messages = [
    "Are you sure?",
    "Really sure??",
    "Think again 💗",
    "I’ll be sad 🥺",
    "Say yes ❤️"
];
let msgIndex = 0;

function handleNoClick() {
    startMusic();
    const noBtn = document.querySelector(".no-button");
    noBtn.textContent = messages[msgIndex];
    msgIndex = (msgIndex + 1) % messages.length;

    noBtn.classList.remove("shake");
    void noBtn.offsetWidth;
    noBtn.classList.add("shake");
}

/* FIREWORKS */
const canvas = document.getElementById("celebration");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

function heartFirework(x, y) {
    const parts = [];
    for (let t = 0; t < Math.PI * 2; t += 0.2) {
        const r = 16 * Math.pow(Math.sin(t), 3);
        const px = r;
        const py = -(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));
        parts.push({ x, y, vx: px*0.5, vy: py*0.5, life: 60 });
    }

    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        parts.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            ctx.fillStyle = `rgba(255,77,109,${p.life/60})`;
            ctx.beginPath();
            ctx.arc(p.x,p.y,3,0,Math.PI*2);
            ctx.fill();
        });
        if (parts.some(p => p.life > 0)) requestAnimationFrame(animate);
    }
    animate();
}

/* YES button */
function handleYesClick() {
    startMusic();

    let count = 0;
    const burst = setInterval(() => {
        heartFirework(
            Math.random() * canvas.width,
            Math.random() * canvas.height * 0.5
        );
        count++;
        if (count === 4) clearInterval(burst);
    }, 600);

    setTimeout(() => {
        window.location.href = "yes_page.html";
    }, 3000);
}

