// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    }
});

function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    if (cursorOutline) {
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
    }

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Particle Canvas
const particlesCanvas = document.getElementById('particlesCanvas');
const ctx = particlesCanvas.getContext('2d');

particlesCanvas.width = window.innerWidth;
particlesCanvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;

class Particle {
    constructor() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > particlesCanvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > particlesCanvas.height) this.vy *= -1;

        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            this.x -= dx * 0.01;
            this.y -= dy * 0.01;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 215, 0, ${0.15 * (1 - distance / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize', () => {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
});

// Cat Parallax Effect
const catImage = document.getElementById('catImage');

if (catImage) {
    document.addEventListener('mousemove', (e) => {
        const rect = catImage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) / 50;
        const deltaY = (e.clientY - centerY) / 50;

        catImage.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1)`;
    });
}

// Typing Animation
const typingMessage = document.getElementById('typingMessage');
const continueBtn = document.getElementById('continueBtn');

const messages = [
    "Every moment with you feels like magic...",
    "You're my Genius, my Koffee, my everything...",
    "This Valentine's Day, I have something special to ask you..."
];

let messageIndex = 0;
let charIndex = 0;
let isTyping = true;

function typeMessage() {
    if (messageIndex < messages.length) {
        if (charIndex < messages[messageIndex].length) {
            typingMessage.textContent += messages[messageIndex][charIndex];
            charIndex++;
            setTimeout(typeMessage, 50);
        } else {
            setTimeout(() => {
                if (messageIndex < messages.length - 1) {
                    typingMessage.textContent = '';
                    charIndex = 0;
                    messageIndex++;
                    setTimeout(typeMessage, 500);
                } else {
                    // Show continue button
                    setTimeout(() => {
                        continueBtn.style.opacity = '1';
                        continueBtn.style.pointerEvents = 'auto';
                    }, 1000);
                }
            }, 2000);
        }
    }
}

setTimeout(typeMessage, 1000);

// Continue Button
continueBtn.addEventListener('click', () => {
    const heroSection = document.getElementById('heroSection');
    const questionSection = document.getElementById('questionSection');

    heroSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    heroSection.style.opacity = '0';
    heroSection.style.transform = 'scale(0.95)';

    setTimeout(() => {
        heroSection.style.display = 'none';
        questionSection.style.display = 'flex';
        questionSection.style.opacity = '0';

        setTimeout(() => {
            questionSection.style.transition = 'opacity 0.6s ease';
            questionSection.style.opacity = '1';
        }, 50);
    }, 600);
});

// No Button Interaction
const noBtn = document.getElementById('noBtn');
const noText = document.getElementById('noText');
const yesBtn = document.getElementById('yesBtn');
const reactionMessage = document.getElementById('reactionMessage');

const noTexts = [
    "No",
    "Wait... 🥺",
    "Really?",
    "Think again",
    "Are you sure?",
    "Please? 🥹",
    "Mottuu says yes!",
    "One more chance?",
    "Pretty please? ✨"
];

const sadMessages = [
    "You don't love me? 💔",
    "But... Mottuu is here... 🥺",
    "Please, Genius... 💕",
    "Think about all our moments together...",
    "Your Koffee is sad now... ☕💔",
    "Boiffi needs you... 🥹",
    "Just one yes? Please? 💖"
];

let noClickCount = 0;
let isNoBtnMoving = false;

function moveNoButton() {
    if (isNoBtnMoving) return;
    isNoBtnMoving = true;

    const container = document.querySelector('.choices-container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = containerRect.width - btnRect.width;
    const maxY = 200;

    const randomX = Math.random() * maxX - maxX / 2;
    const randomY = (Math.random() - 0.5) * maxY;

    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

    // Update text
    noClickCount++;
    if (noClickCount < noTexts.length) {
        noText.textContent = noTexts[noClickCount];
    }

    // Show sad message
    const messageIndex = Math.min(noClickCount - 1, sadMessages.length - 1);
    reactionMessage.textContent = sadMessages[messageIndex];
    reactionMessage.classList.add('show');

    setTimeout(() => {
        reactionMessage.classList.remove('show');
    }, 2000);

    setTimeout(() => {
        isNoBtnMoving = false;
    }, 400);
}

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Yes Button
yesBtn.addEventListener('click', () => {
    const mainPage = document.getElementById('mainPage');
    const successPage = document.getElementById('successPage');

    mainPage.style.transition = 'opacity 0.8s ease';
    mainPage.style.opacity = '0';

    setTimeout(() => {
        mainPage.style.display = 'none';
        successPage.style.display = 'flex';
        successPage.style.opacity = '0';

        setTimeout(() => {
            successPage.style.transition = 'opacity 0.8s ease';
            successPage.style.opacity = '1';

            // Start confetti and fireworks
            startConfetti();
            startFireworks();
        }, 50);
    }, 800);
});

// Confetti Animation
function startConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const confettiCount = 150;
    const colors = ['#FFD700', '#FF69B4', '#9D4EDD', '#FF1493', '#FFA500'];

    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 8 + 4;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;

            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    for (let i = 0; i < confettiCount; i++) {
        confetti.push(new Confetti());
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach(c => {
            c.update();
            c.draw();
        });

        requestAnimationFrame(animateConfetti);
    }

    animateConfetti();
}

// Fireworks Animation
function startFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];
    const particles = [];

    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * canvas.height * 0.5;
            this.speed = 5;
            this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        }

        update() {
            this.y -= this.speed;

            if (this.y <= this.targetY) {
                this.explode();
                return false;
            }
            return true;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        explode() {
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(this.x, this.y, this.color));
            }
        }
    }

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.vx *= 0.98;
            this.vy *= 0.98;
            this.vy += 0.1;
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.decay;

            return this.alpha > 0;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    function createFirework() {
        if (Math.random() < 0.05) {
            fireworks.push(new Firework());
        }
    }

    function animateFireworks() {
        ctx.fillStyle = 'rgba(10, 0, 20, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        createFirework();

        for (let i = fireworks.length - 1; i >= 0; i--) {
            if (!fireworks[i].update()) {
                fireworks.splice(i, 1);
            } else {
                fireworks[i].draw();
            }
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            if (!particles[i].update()) {
                particles.splice(i, 1);
            } else {
                particles[i].draw();
            }
        }

        requestAnimationFrame(animateFireworks);
    }

    animateFireworks();
}

// Button Hover Effects
document.querySelectorAll('.liquid-btn, .premium-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        if (cursorOutline) {
            cursorOutline.style.width = '50px';
            cursorOutline.style.height = '50px';
            cursorOutline.style.borderColor = 'rgba(255, 105, 180, 0.8)';
        }
    });

    btn.addEventListener('mouseleave', () => {
        if (cursorOutline) {
            cursorOutline.style.width = '32px';
            cursorOutline.style.height = '32px';
            cursorOutline.style.borderColor = 'rgba(255, 215, 0, 0.5)';
        }
    });
});
