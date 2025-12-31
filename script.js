// Editable list of friends
// You can add more friends here
const friendsData = [
    { name: "Kida", message: "To new heights in 2026!" },
    { name: "Gurumav", message: "Wisdom and joy to you!" },
    { name: "Aiko", message: "Shine bright this year!" },
    { name: "Lil don", message: "Keep running the game!" },
    { name: "Lebron", message: "Greatness awaits!" },
    { name: "KSO", message: "Wishing you the best!" },
    { name: "Ganiyu", message: "Prosperity and peace!" },
    { name: "Broda Samu", message: "Stay amazing!" },
    { name: "Moses", message: "Lead the way in 2026!" },
    { name: "Osi", message: "Happiness always!" },
    { name: "Samuel(Ekiti)", message: "Success is yours!" },
    { name: "Emma", message: "Have a wonderful year!" },
    { name: "Elisha", message: "Blessings on blessings!" },
    { name: "ShoeChef", message: "Step into greatness!" },
    { name: "Dunchala", message: "Cheers to the New Year!" },
    { name: "Armani", message: "Style and grace!" },
    { name: "Chuckwu", message: "Stay blessed and good" },
    { name: "Khalid", message: "More success" },
    { name: "Breezy", message: "Be the face of 2026!" },
    { name: "Jaworski", message: "More success this year" },
];

document.addEventListener('DOMContentLoaded', () => {
    renderFriends();
    initConfetti();
});

function renderFriends() {
    const list = document.getElementById('friends-list');

    // Add staggered animation delay
    friendsData.forEach((friend, index) => {
        const li = document.createElement('li');
        li.className = 'friend-card';
        li.style.animation = `slideIn 0.5s ease backwards ${index * 0.1 + 0.5}s`;

        // Get initials
        const initials = friend.name.split(' ').map(n => n[0]).join('').substring(0, 2);

        li.innerHTML = `
            <div class="avatar">${initials}</div>
            <div class="friend-info">
                <span class="friend-name">${friend.name}</span>
                <span class="friend-msg">${friend.message}</span>
            </div>
        `;

        list.appendChild(li);
    });
}

// Add animation keyframes for list items dynamically
const styleDate = document.createElement('style');
styleDate.innerHTML = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(styleDate);

/* --- Confetti Logic --- */
function initConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    const particles = [];

    canvas.width = width;
    canvas.height = height;

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    const colors = ['#ff0055', '#00ddff', '#ffff00', '#00ff77', '#ff8800'];

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height - height; // Start above
            this.vx = Math.random() * 4 - 2;
            this.vy = Math.random() * 4 + 2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.size = Math.random() * 5 + 3;
            this.rotation = Math.random() * 360;
            this.rotSpeed = Math.random() * 10 - 5;
        }

        update() {
            this.y += this.vy;
            this.x += this.vx;
            this.rotation += this.rotSpeed;

            // Reset if below screen
            if (this.y > height) {
                this.y = -20;
                this.x = Math.random() * width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    // Create particles
    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}
