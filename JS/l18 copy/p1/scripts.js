let date = new Date();
let key = "";

const grid = document.getElementById('grid');
const title = document.getElementById('title');
const modal = document.getElementById('modal');
const text = document.getElementById('text');
const head = document.getElementById('head');

function draw() {
    grid.innerHTML = "";
    const y = date.getFullYear();
    const m = date.getMonth();
    title.innerText = date.toLocaleString('ru', { month: 'long', year: 'numeric' });

    const start = new Date(y, m, 1).getDay();
    const total = new Date(y, m + 1, 0).getDate();
    const now = new Date();

    for (let i = 0; i < (start === 0 ? 6 : start - 1); i++) {
        const empty = document.createElement('div');
        grid.appendChild(empty);
    }

    for (let d = 1; d <= total; d++) {
        const cell = document.createElement('div');
        cell.className = "box";
        cell.innerText = d;
        const current = `${d}.${m + 1}.${y}`;

        if (d === now.getDate() && m === now.getMonth() && y === now.getFullYear()) {
            cell.classList.add("today");
        }
        if (localStorage.getItem(current)) {
            cell.classList.add("note");
        }

        cell.addEventListener('click', () => {
            key = current;
            head.innerText = key;
            text.value = localStorage.getItem(key) || "";
            modal.style.display = "block";
        });
        grid.appendChild(cell);
    }
}

document.getElementById('save').addEventListener('click', () => {
    localStorage.setItem(key, text.value);
    modal.style.display = "none";
    draw();
});

document.getElementById('del').addEventListener('click', () => {
    localStorage.removeItem(key);
    modal.style.display = "none";
    draw();
});

document.getElementById('close').addEventListener('click', () => {
    modal.style.display = "none";
});

document.getElementById('p').addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    draw();
});

document.getElementById('n').addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    draw();
});

document.getElementById('clear').addEventListener('click', () => {
    localStorage.clear();
    draw();
});

draw();
