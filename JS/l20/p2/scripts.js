const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const brushSizeValue = document.getElementById('brushSizeValue');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) {
        return;
    }
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageData = event.target.result;
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        }
        img.src = imageData;
    };
    reader.readAsDataURL(file);
});

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = getMousePos(e);
}

function draw(e) {
    if (!isDrawing) {
        return;
    }
    const [x, y] = getMousePos(e);
    ctx.lineWidth = brushSize.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorPicker.value;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    [lastX, lastY] = [x, y];
}

function stopDrawing() {
    isDrawing = false;
}

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return [
        e.clientX - rect.left,
        e.clientY - rect.top
    ];
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

brushSize.addEventListener('input', function() {
    brushSizeValue.textContent = this.value;
});

function saveImage() {
    const imageData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = imageData;
    link.click();
}

function addText() {
    const text = prompt('Введите текст:', 'Привет!');
    if (!text) {
        return;
    }
    ctx.font = '24px Arial';
    ctx.fillStyle = colorPicker.value;
    ctx.textAlign = 'center';
    
    let input = prompt('Введите координаты через запятую: ');
    if (!input) {
        return;
    }
    let coords = input.split(',');
    let x = Number(coords[0]);
    let y = Number(coords[1]);
    
    while (isNaN(x) || isNaN(y) || x > canvas.width || x < 0 || y > canvas.height || y < 0) {
        input = prompt('Введите координаты через запятую: ');
        if (!input) {
            return;
        }
        coords = input.split(',');
        x = Number(coords[0]);
        y = Number(coords[1]);
    }
    ctx.fillText(text, x, y);
}
