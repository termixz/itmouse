const NS = 'http://www.w3.org/2000/svg';

document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.overflow = 'hidden';
document.body.style.backgroundColor = 'blue';

const svg = document.createElementNS(NS, 'svg');
svg.setAttribute('viewBox', '0 0 100 100');
svg.setAttribute('width', '100vw');
svg.setAttribute('height', '100vh');
svg.setAttribute('preserveAspectRatio', 'none');
svg.style.display = 'block';
function rect(x,y,width,height,color,name){
    name.setAttribute('x', `${x}`);
    name.setAttribute('y', `${y}`);
    name.setAttribute('width', `${width}`);
    name.setAttribute('height', `${height}`);
    name.setAttribute('fill', `${color}`);
    name.setAttribute('stroke', 'black');
    name.setAttribute('stroke-width', '0.5');
    svg.appendChild(name);
}

const moon = document.createElementNS(NS, 'path');

const d = "M20,20 A12,12 0 1,0 20,40 A10,10 0 1,1 20,20 Z";

moon.setAttribute('d', d);
moon.setAttribute('fill', '#f1c40f');
moon.setAttribute('stroke', 'black');
moon.setAttribute('stroke-width', '0.5');
svg.appendChild(moon);

const moon2 = document.createElementNS(NS, 'path');

const a = "M20,20 A12,12 0 1,0 20,40 A10,10 0 1,1 20,20 Z";

moon2.setAttribute('d', d);
moon2.setAttribute('fill', '#f1c40f');
moon2.setAttribute('stroke', 'black');
moon2.setAttribute('stroke-width', '0.5');
svg.appendChild(moon2);

const grass = document.createElementNS(NS, 'rect');
rect(0,80,100,20,'#0a4a15',grass);
const bhouse = document.createElementNS(NS, 'rect');
rect(35,55,30,25,'#beff55',bhouse)
const roof = document.createElementNS(NS, 'polygon');
roof.setAttribute('points', '35,55 65,55 50,35');
roof.setAttribute('fill', '#725423');
roof.setAttribute('stroke', 'black');
roof.setAttribute('stroke-width', '0.5');
svg.appendChild(roof);

const windowf = document.createElementNS(NS, 'rect');
rect(40,62,8,8,'#00eaff',windowf)
const door = document.createElementNS(NS, 'rect');
rect(52,65,8,15,'#725423',door)
const doorh = document.createElementNS(NS, 'circle');
doorh.setAttribute('cx', '58');
doorh.setAttribute('cy', '73');
doorh.setAttribute('r', '0.8');
doorh.setAttribute('fill', '#a07836');
doorh.setAttribute('stroke', 'black');
doorh.setAttribute('stroke-width', '0.2');
svg.appendChild(doorh);

document.body.appendChild(svg);

