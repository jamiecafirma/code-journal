/* global data */
/* exported data */

var $photoUrl = document.querySelector('#image-url');
var $photoPreview = document.querySelector('#image-preview');

function updateImage(event) {
  $photoPreview.setAttribute('src', event.target.value);
}

$photoUrl.addEventListener('input', updateImage);

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

var $diaryEntryForm = document.querySelector('#diary-entry-form');

var $entryList = document.querySelector('#entry-list');

function addNewEntry(event) {
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

  $entryList.prepend(createEntry(formData));

  var $entriesView = document.querySelector('#entries-view');
  var $formView = document.querySelector('#form-view');

  $entriesView.className = 'view';
  $formView.className = 'view hidden';
}

$diaryEntryForm.addEventListener('submit', addNewEntry);

/* <li class="row entry-margin">
  <div class="column-half">
    <img src="" alt="dummy entry 1" class="border-radius-4">
  </div>
  <div class="column-half">
    <h2 class="image-title-style"></h2>
    <p></p>
  </div>
</li> */

function loadJournalEntries(event) {
  $entryList = document.querySelector('#entry-list');
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(createEntry(data.entries[i]));
  }
}

document.addEventListener('DOMContentLoaded', loadJournalEntries);

var $entriesLink = document.querySelector('#view-entries-link');
var $entryFormLink = document.querySelector('#entry-form-link');
var $views = document.querySelectorAll('.view');

function changeView(event) {
  var $dataView = event.target.getAttribute('data-view');

  for (var v = 0; v < $views.length; v++) {
    if ($views[v].getAttribute('data-view') === $dataView) {
      $views[v].className = 'view';
    } else {
      $views[v].className = 'view hidden';
    }
  }
}

$entriesLink.addEventListener('click', changeView);
$entryFormLink.addEventListener('click', changeView);
