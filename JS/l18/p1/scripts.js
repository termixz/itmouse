const tip = document.getElementById('tip');
const desc = document.getElementById('desc');
const sum = document.getElementById('sum');
const day = document.getElementById('day');
const btn = document.getElementById('add');
const list = document.getElementById('list');

let db = JSON.parse(localStorage.getItem('data')) || [];

function sync() {
    list.innerHTML = '';
    let i = 0, e = 0;

    db.forEach((item, idx) => {
        if (item.tip == 'income') i += parseFloat(item.val);
        else e += parseFloat(item.val);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.tip == 'income' ? 'Доход' : 'Расход'}</td>
            <td>${item.text}</td>
            <td>${parseFloat(item.val).toFixed(2)}</td>
            <td>${item.date}</td>
            <td><button class="del" onclick="cut(${idx})">&times;</button></td>
        `;
        list.appendChild(row);
    });

    document.getElementById('in').innerText = i.toFixed(2);
    document.getElementById('out').innerText = e.toFixed(2);
    document.getElementById('total').innerText = (i - e).toFixed(2);
    document.getElementById('val-in').innerText = i;
    document.getElementById('val-out').innerText = e;

    render(i, e);
    localStorage.setItem('data', JSON.stringify(db));
    verify();
}

function render(i, e) {
    const all = i + e;
    const sIn = document.getElementById('seg-in');
    const sOut = document.getElementById('seg-out');

    if (all === 0) {
        sIn.setAttribute('stroke-dasharray', '0 100');
        sOut.setAttribute('stroke-dasharray', '0 100');
        return;
    }

    const pIn = (i / all) * 100;
    const pOut = (e / all) * 100;

    sIn.setAttribute('stroke-dasharray', `${pIn} ${100 - pIn}`);
    sIn.setAttribute('stroke-dashoffset', '25');

    sOut.setAttribute('stroke-dasharray', `${pOut} ${100 - pOut}`);
    sOut.setAttribute('stroke-dashoffset', -pIn + 25);
}

function verify() {
    if (desc.value != "" && sum.value != "" && day.value != "") {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

btn.addEventListener('click', () => {
    db.push({
        tip: tip.value,
        text: desc.value,
        val: sum.value,
        date: day.value
    });
    desc.value = '';
    sum.value = '';
    sync();
});

[desc, sum, day].forEach(el => {
    el.addEventListener('input', verify);
});

window.cut = (idx) => {
    db.splice(idx, 1);
    sync();
};

document.addEventListener('DOMContentLoaded', sync);
