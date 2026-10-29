const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const formData = new FormData(form);
    const div = document.createElement('div');
    
    div.style.marginTop = '20px';
    div.style.padding = '20px';
    div.style.backgroundColor = 'var(--container-bg)';
    div.style.border = '1px solid #ccc';
    div.style.borderRadius = '8px';

    const hobbies = formData.getAll('hobbies').join(', ');
    const skills = formData.getAll('skills').join(', ');

    div.innerHTML = `
        <div style="font-family: 'JetBrains Mono', monospace;">
            <h3>Submitted Data:</h3>
            <p><strong>Name:</strong> ${document.getElementById('name').value}</p>
            <p><strong>Email:</strong> ${document.getElementById('email').value}</p>
            <p><strong>Password:</strong> ${document.getElementById('password').value}</p>
            <p><strong>Age:</strong> ${document.getElementById('age').value}</p>
            <p><strong>Telephone:</strong> ${document.getElementById('telephone').value}</p>
            <p><strong>Web-site:</strong> ${document.getElementById('Web-site').value}</p>
            <p><strong>Birthday:</strong> ${document.getElementById('birthday').value}</p>
            <p><strong>Gender:</strong> ${formData.get('gender')}</p>
            <p><strong>Hobbies:</strong> ${hobbies}</p>
            <p><strong>Programming:</strong> ${formData.get('programming') ? 'Yes' : 'No'}</p>
            <p><strong>Country:</strong> ${form.querySelector('select').value}</p>
            <p><strong>Skills:</strong> ${skills}</p>
            <p><strong>Comment:</strong> ${form.querySelector('textarea').value}</p>
        </div>
    `;

    const oldResult = document.querySelector('.form-result');
    if (oldResult) oldResult.remove();
    
    div.classList.add('form-result');
    document.body.appendChild(div);
});
