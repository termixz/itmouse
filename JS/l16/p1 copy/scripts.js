const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const formData = new FormData(form);
    let score = 0;

    if (formData.get('htmlis') === 'correct') {
        score++;
    }
    const selectedH = formData.getAll('headers'); 

    const correct = selectedH.filter(val => val === 'correct').length;

    const haswrong = selectedH.includes('wrong');

    if (correct === 3 && !haswrong) {
        score++;
    }
    if (formData.get('css') === 'correct') {
        score++;
    }

    if (formData.get('link') === 'correct') {
        score++;
    }

    if (formData.get('paragraph') === 'correct') {
        score++;
    }

    alert(`Correct answers: ${score} out of 5`);
});
form.reset();

function clearFormCompletely(form) {
    form.reset();
    form.querySelectorAll('input, select, textarea').forEach(el => {
    if (el.tagName === 'TEXTAREA') {
    el.value = '';
    } else if (el.tagName === 'SELECT') {
    if (el.multiple) {
    Array.from(el.options).forEach(o => o.selected = false);
    } else {
    el.selectedIndex = 0;
    }
    } else if (el.type === 'checkbox' || el.type === 'radio') {
    el.checked = false;
    } else if (el.type !== 'hidden' && el.type !== 'button' && el.type !== 'submit' && el.type !== 'reset') {
    el.value = '';
    }
    });
}
