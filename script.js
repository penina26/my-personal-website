// Mobile nav 
const navToggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('#menu');

if (navToggle && menu) {
    navToggle.addEventListener('click', () => {
        const open = menu.classList.toggle('show');
        navToggle.setAttribute('aria-expanded', String(open));
    });
}


// Contact Form Validation 
const form = document.querySelector('#contactForm');
let note = document.querySelector('#formNote');

function ensureNote() {
    if (!note && form) {
        note = document.createElement('div');
        note.id = 'formNote';
        note.className = 'form-note';
        note.setAttribute('role', 'alert');
        note.setAttribute('aria-live', 'polite');
        note.hidden = true;
        form.insertBefore(note, form.firstChild);
    }
}

function showNote(type, messages) {
    ensureNote();
    const html = Array.isArray(messages)
        ? `<ul>${messages.map(m => `<li>${m}</li>`).join('')}</ul>`
        : String(messages);
    note.innerHTML = html;
    note.classList.remove('error', 'success', 'show');
    note.hidden = false;
    note.classList.add('show', type);
}

function clearNote() {
    if (!note) return;
    note.classList.remove('show', 'error', 'success');
    note.hidden = true;
    note.innerHTML = '';
}

function markError(el, on) {
    if (!el) return;
    if (on) {
        el.classList.add('input-error');
        el.setAttribute('aria-invalid', 'true');
    } else {
        el.classList.remove('input-error');
        el.removeAttribute('aria-invalid');
    }
}

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameEl = document.querySelector('#name');
        const emailEl = document.querySelector('#email');
        const messageEl = document.querySelector('#message');

        clearNote();
        [nameEl, emailEl, messageEl].forEach(el => markError(el, false));

        const errors = [];
        const name = nameEl.value.trim();
        const email = emailEl.value.trim();
        const message = messageEl.value.trim();

        if (!name) {
            errors.push('Please provide your name.');
            markError(nameEl, true);
        }

        if (!email) {
            errors.push('Please provide your email.');
            markError(emailEl, true);
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('Please enter a valid email address.');
            markError(emailEl, true);
        }

        if (errors.length > 0) {
            showNote('error', errors);
            return;
        }

        showNote('success', 'Thanks! Your message has been recorded (demo).');
        form.reset();
    });

    form.addEventListener('input', (e) => {
        if (e.target.matches('#name, #email, #message')) {
            markError(e.target, false);
        }
    });
}

// Footer year 
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();


