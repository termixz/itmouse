const canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 800;
const ctx = canvas.getContext('2d');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let x = 50;
let y = 50;
let d = 180;
let x1 = 700;
let y1 = 700;
let d1 = 0;

let isa = true;
let isPlayerAlive = true;
let speed = 10;
let botFiring = false;
let canPlayerShoot = true;
let botAxisPriority = Math.random() > 0.5 ? 'x' : 'y';
let botStuckTimer = 0;
let bypassDirection = null;

let playerBullets = [];
let botBullets = [];
let walls = [];

function generateWalls() {
    for (let i = 0; i < 15; i++) {
        walls.push({
            x: Math.floor(Math.random() * 14 + 1) * 50,
            y: Math.floor(Math.random() * 14 + 1) * 50
        });
    }
}
generateWalls();

function checkCollision(nx, ny, tx, ty, ignoreTanks = false) {
    if (nx < 0 || nx > 750 || ny < 0 || ny > 750) {
        return true;
    }
    if (!ignoreTanks && nx + 50 > tx && nx < tx + 50 && ny + 50 > ty && ny < ty + 50) {
        return true;
    }
    for (let wall of walls) {
        if (nx + 50 > wall.x && nx < wall.x + 50 && ny + 50 > wall.y && ny < wall.y + 50) {
            return true;
        }
    }
    return false;
}

function canBotSeePlayer(bx, by, px, py, direction) {
    let checkX = bx + 25;
    let checkY = by + 25;
    const step = 10;

    while (checkX > 0 && checkX < 800 && checkY > 0 && checkY < 800) {
        if (direction === 0) checkY -= step;
        else if (direction === 180) checkY += step;
        else if (direction === 90) checkX += step;
        else if (direction === 270) checkX -= step;

        for (let wall of walls) {
            if (checkX > wall.x && checkX < wall.x + 50 && checkY > wall.y && checkY < wall.y + 50) {
                return false;
            }
        }

        if (checkX > px && checkX < px + 50 && checkY > py && checkY < py + 50) {
            return true;
        }
    }
    return false;
}

function show() {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#64748b';
    for (let wall of walls) {
        ctx.fillRect(wall.x, wall.y, 50, 50);
    }

    if (isPlayerAlive) {
        ctx.save();
        ctx.translate(x + 25, y + 25);
        ctx.rotate(d * Math.PI / 180);
        ctx.fillStyle = 'red';
        ctx.fillRect(-25, -25, 50, 50);
        ctx.fillStyle = 'green';
        ctx.fillRect(-5, -45, 10, 50);
        ctx.restore();
    } else {
        ctx.fillStyle = 'red';
        ctx.font = 'bold 48px Segoe UI';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    }

    if (isa) {
        ctx.save();
        ctx.translate(x1 + 25, y1 + 25);
        ctx.rotate(d1 * Math.PI / 180);
        ctx.fillStyle = 'blue';
        ctx.fillRect(-25, -25, 50, 50);
        ctx.fillStyle = 'yellow';
        ctx.fillRect(-5, -45, 10, 50);
        ctx.restore();
    } else if (isPlayerAlive) {
        ctx.fillStyle = 'yellow';
        ctx.font = 'bold 48px Segoe UI';
        ctx.textAlign = 'center';
        ctx.fillText('YOU WIN!', canvas.width / 2, canvas.height / 2);
    }

    updateBullets();
}

function updateBullets() {
    for (let i = playerBullets.length - 1; i >= 0; i--) {
        let pb = playerBullets[i];
        if (pb.d === 0) pb.y -= 7;
        else if (pb.d === 180) pb.y += 7;
        else if (pb.d === 90) pb.x += 7;
        else if (pb.d === 270) pb.x -= 7;

        let hitWall = false;
        for (let wall of walls) {
            if (pb.x + 30 > wall.x && pb.x + 20 < wall.x + 50 && pb.y + 30 > wall.y && pb.y + 20 < wall.y + 50) {
                hitWall = true;
                break;
            }
        }

        if (hitWall || pb.x < -50 || pb.x > 850 || pb.y < -50 || pb.y > 850) {
            playerBullets.splice(i, 1);
            continue;
        }

        drawBullet(pb.x, pb.y, pb.d, 'purple');

        if (isa && pb.x + 25 > x1 && pb.x + 25 < x1 + 50 && pb.y + 25 > y1 && pb.y + 25 < y1 + 50) {
            isa = false;
            playerBullets.splice(i, 1);
        }
    }

    for (let i = botBullets.length - 1; i >= 0; i--) {
        let bb = botBullets[i];
        if (bb.d === 0) bb.y -= 7;
        else if (bb.d === 180) bb.y += 7;
        else if (bb.d === 90) bb.x += 7;
        else if (bb.d === 270) bb.x -= 7;

        let hitWall = false;
        for (let wall of walls) {
            if (bb.x + 30 > wall.x && bb.x + 20 < wall.x + 50 && bb.y + 30 > wall.y && bb.y + 20 < wall.y + 50) {
                hitWall = true;
                break;
            }
        }

        if (hitWall || bb.x < -50 || bb.x > 850 || bb.y < -50 || bb.y > 850) {
            botBullets.splice(i, 1);
            continue;
        }

        drawBullet(bb.x, bb.y, bb.d, 'orange');

        if (isPlayerAlive && bb.x + 25 > x && bb.x + 25 < x + 50 && bb.y + 25 > y && bb.y + 25 < y + 50) {
            isPlayerAlive = false;
            botBullets.splice(i, 1);
        }
    }
}

function drawBullet(xb, yb, db, color) {
    ctx.save();
    ctx.translate(xb + 25, yb + 25);
    ctx.rotate(db * Math.PI / 180);
    ctx.fillStyle = color;
    ctx.fillRect(-5, -45, 10, 20);
    ctx.restore();
}

addEventListener('keydown', async (e) => {
    if (!isPlayerAlive) return;
    switch (e.key) {
        case 'ArrowUp': case 'w':
            d = 0;
            for (let i = 0; i < speed; i++) {
                if (!checkCollision(x, y - 1, x1, y1)) y -= 1;
                await sleep(10);
            }
            break;
        case 'ArrowDown': case 's':
            d = 180;
            for (let i = 0; i < speed; i++) {
                if (!checkCollision(x, y + 1, x1, y1)) y += 1;
                await sleep(10);
            }
            break;
        case 'ArrowLeft': case 'a':
            d = 270;
            for (let i = 0; i < speed; i++) {
                if (!checkCollision(x - 1, y, x1, y1)) x -= 1;
                await sleep(10);
            }
            break;
        case 'ArrowRight': case 'd':
            d = 90;
            for (let i = 0; i < speed; i++) {
                if (!checkCollision(x + 1, y, x1, y1)) x += 1;
                await sleep(10);
            }
            break;
        case ' ':
            if (canPlayerShoot) {
                playerBullets.push({ x: x, y: y, d: d });
                canPlayerShoot = false;
                setTimeout(() => { canPlayerShoot = true; }, 400);
            }
            break;
    }
});

setInterval(show, 20);

setInterval(async () => {
    if (!isa || !isPlayerAlive || botFiring) return;

    let dx = x - x1;
    let dy = y - y1;

    if (Math.abs(dx) < 25 || Math.abs(dy) < 25) {
        let targetD = Math.abs(dx) < 25 ? (dy > 0 ? 180 : 0) : (dx > 0 ? 90 : 270);
        
        if (canBotSeePlayer(x1, y1, x, y, targetD)) {
            d1 = targetD;
            botFiring = true;
            botBullets.push({ x: x1, y: y1, d: d1 });
            await sleep(400);
            botFiring = false;
            return;
        }
    }

    let moved = false;
    let stepSize = 3;

    const moveX = () => {
        let s = dx > 0 ? stepSize : -stepSize;
        if (!checkCollision(x1 + s, y1, x, y)) {
            x1 += s;
            d1 = dx > 0 ? 90 : 270;
            moved = true;
        }
    };

    const moveY = () => {
        let s = dy > 0 ? stepSize : -stepSize;
        if (!checkCollision(x1, y1 + s, x, y)) {
            y1 += s;
            d1 = dy > 0 ? 180 : 0;
            moved = true;
        }
    };

    if (botAxisPriority === 'x') moveX(); else moveY();
    if (!moved) {
        if (botAxisPriority === 'x') moveY(); else moveX();
    }

    if (!moved) {
        botStuckTimer++;
        if (botStuckTimer > 5) {
            if (!bypassDirection) {
                bypassDirection = Math.random() > 0.5 ? 1 : -1;
            }
            
            let bypassStep = stepSize * bypassDirection;
            if (botAxisPriority === 'x') {
                if (!checkCollision(x1, y1 + bypassStep, x, y)) {
                    y1 += bypassStep;
                    d1 = bypassStep > 0 ? 180 : 0;
                } else {
                    bypassDirection *= -1;
                }
            } else {
                if (!checkCollision(x1 + bypassStep, y1, x, y)) {
                    x1 += bypassStep;
                    d1 = bypassStep > 0 ? 90 : 270;
                } else {
                    bypassDirection *= -1;
                }
            }
        }
    } else {
        botStuckTimer = 0;
        if (Math.random() > 0.98) {
            botAxisPriority = botAxisPriority === 'x' ? 'y' : 'x';
            bypassDirection = null;
        }
    }
}, 30);
