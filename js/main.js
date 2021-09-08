/* global data */
/* exported data */

var $photoUrl = document.querySelector('#image-url');
var $photoPreview = document.querySelector('#image-preview');

function updateImage(event) {
  $photoPreview.setAttribute('src', event.target.value);
}

$photoUrl.addEventListener('input', updateImage);

var $diaryEntryForm = document.querySelector('#diary-entry-form');

function getFormData(event) {
  event.preventDefault();

  var formData = {};

  formData.title = $diaryEntryForm.title.value;
  formData.url = $diaryEntryForm.url.value;
  formData.notes = $diaryEntryForm.notes.value;

  formData.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(formData);

  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $diaryEntryForm.reset();
}

$diaryEntryForm.addEventListener('submit', getFormData);

/* <li class="row entry-margin">
  <div class="column-half">
    <img src="" alt="dummy entry 1" class="border-radius-4">
  </div>
  <div class="column-half">
    <h2 class="image-title-style"></h2>
    <p></p>
  </div>
</li> */

function createEntry(entry) {
  var $journalEntry = document.createElement('li');
  $journalEntry.className = 'row entry-margin';

  var $imagePlaceholder = document.createElement('div');
  $imagePlaceholder.className = 'column-half';
  $journalEntry.appendChild($imagePlaceholder);

  var $entryImage = document.createElement('img');
  $entryImage.className = 'border-radius-4';
  $entryImage.setAttribute('src', entry.url);
  $entryImage.setAttribute('alt', entry.title);
  $imagePlaceholder.appendChild($entryImage);

  var $entryText = document.createElement('div');
  $entryText.className = 'column-half';
  $journalEntry.appendChild($entryText);

  var $entryTitle = document.createElement('h2');
  $entryTitle.className = 'image-title-style';
  $entryTitle.textContent = entry.title;
  $entryText.appendChild($entryTitle);

  var $entryNotes = document.createElement('p');
  $entryNotes.textContent = entry.notes;
  $entryText.appendChild($entryNotes);

  return $journalEntry;
}

var $entryList = document.querySelector('#entry-list');

function loadJournalEntries(event) {
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.prepend(createEntry(data.entries[i]));
  }
}

document.addEventListener('DOMContentLoaded', loadJournalEntries);
