// Add smooth scrolling to navigation links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll reveal animation to sections
const sections = document.querySelectorAll('section');
const options = {
    threshold: 0.2
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Add form submission handling
const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'send-email.php');
    xhr.onload = function() {
        if (xhr.status === 200) {
            alert('Email sent successfully!');
            contactForm.reset();
        } else {
            alert('An error occurred. Please try again later.');
        }
    };
    xhr.send(formData);
});

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lines = [];
const maxLines = 50;
const maxDistance = 200;

class Line {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) {
            this.speedX *= -1;
        }

        if (this.y < 0 || this.y > canvas.height) {
            this.speedY *= -1;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const distance = Math.sqrt(Math.pow(this.x - line.x, 2) + Math.pow(this.y - line.y, 2));
            if (distance < maxDistance) {
                ctx.lineTo(line.x, line.y);
            }
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.stroke();
    }
}

function init() {
    for (let i = 0; i < maxLines; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        lines.push(new Line(x, y));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lines.forEach(line => {
        line.update();
        line.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
animate();

canvas.addEventListener('mousemove', event => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const targetLine = lines.find(line => {
        const distance = Math.sqrt(Math.pow(mouseX - line.x, 2) + Math.pow(mouseY - line.y, 2));
        return distance < maxDistance;
    });

    if (targetLine) {
        targetLine.x = mouseX;
        targetLine.y = mouseY;
    }
});