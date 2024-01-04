'use strict';

const titleInput = document.querySelector('[data-title]');
const textInput = document.querySelector('[data-text]');
const submit = document.querySelector('[data-submit]');
const notes = document.querySelector('[data-notes]');

let notesTab = [];

if (localStorage.getItem('notes')) {
  notesTab = JSON.parse(localStorage.getItem('notes'));
}
(function getDataLocalStorgae() {
  if (localStorage.getItem('notes')) {
    addNote();
  }
})();

function addLocalStorage() {
  localStorage.setItem('notes', JSON.stringify(notesTab));
}

submit.onclick = function () {
  if (textInput.value !== '') {
    const id = Date.now();
    const noteElement = {
      id,
      title: titleInput.value || 'Title',
      text: textInput.value,
      checked: false,
    };
    notesTab.push(noteElement);
    titleInput.value = '';
    textInput.value = '';

    addNote();
    addLocalStorage();
  }
};

function addNote() {
  notes.textContent = '';
  notesTab.forEach((note) => {
    const markup = `
    <div class="note ${note.checked === true ? 'checked' : ''}" data-id='${
      note.id
    }' onclick='checked(this)'>
      <div class="note__header">
        <p class="note__title">${note.title}</p>
        <button class="btn close-btn" onclick="deleteNote(this)">
          <ion-icon class="trash-icon" name="trash"></ion-icon>
        </button>
      </div>
      <p class="note__text">${note.text}</p>
      </div>
    `;

    notes.insertAdjacentHTML('beforeend', markup);
  });
}

function deleteNote(btn) {
  const note = btn.parentNode.parentNode;
  const id = note.getAttribute('data-id');
  notesTab = notesTab.filter((noteE) => noteE.id != id);
  notes.removeChild(note);
  addLocalStorage();
}
function checked(note) {
  note.classList.toggle('checked');
  notesTab.forEach((note) => {
    note.checked === false ? (note.checked = true) : (note.checked = false);
  });
  addLocalStorage();
}
