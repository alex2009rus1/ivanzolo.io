const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 15,
    image: new Image(), // Создаем новый объект изображения
    speed: 5,
    dx: 0,
    dy: 0,
    score: 0,
    growthRate: 4, // Скорость увеличения радиуса игрока
    draw: function() {
        ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    },
    move: function() {
        if (this.x + this.dx > this.radius && this.x + this.dx < canvas.width - this.radius) {
            this.x += this.dx;
        }
        if (this.y + this.dy > this.radius && this.y + this.dy < canvas.height - this.radius) {
            this.y += this.dy;
        }
    }
};

// Устанавливаем путь к изображению игрока
player.image.src = 'https://sun6-21.userapi.com/impg/JOA9x959ysM6KsO_q_ihiXpw8iM8oMSCEWyKwQ/L2sWXfoCzzU.jpg?size=604x570&quality=96&sign=0c3d3b030ed1ddf7285dc7d17a1b9d53&c_uniq_tag=B8FB0iLLbD9fc9Vim5r1l0E4j2hyJcTHUl76T0o5_bM&type=album'; // Замените 'URL_ИЗОБРАЖЕНИЯ' на ссылку на изображение из интернета

let food = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 10,
    image: new Image(),
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
};

food.image.src = 'https://sun9-24.userapi.com/impg/gpo6oDz1VnWRdwBx96XlhNFCSivozgpD2yHG9Q/8kp7hf3lkq0.jpg?size=525x604&quality=96&sign=ab45eed37c991d35247cbf591e8048c4&type=album';

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    food.draw();
    player.move();
    checkCollision();
    drawScore();
    requestAnimationFrame(draw);
}

function checkCollision() {
    const dx = player.x - food.x;
    const dy = player.y - food.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < player.radius + food.radius) {
        player.radius += player.growthRate; // Увеличиваем радиус игрока с учетом growthRate
        player.score++;
        food.x = Math.random() * canvas.width;
        food.y = Math.random() * canvas.height;
    }
}

function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText('Score: ' + player.score, 10, 20);
}

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            player.dy = -player.speed;
            break;
        case 'ArrowDown':
            player.dy = player.speed;
            break;
        case 'ArrowLeft':
            player.dx = -player.speed;
            break;
        case 'ArrowRight':
            player.dx = player.speed;
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            player.dy = 0;
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            player.dx = 0;
            break;
    }
});

draw();