/* global data */
/* exported data */

var $photoUrl = document.querySelector('#image-url');
var $photoPreview = document.querySelector('#image-preview');

function updateImage(event) {
  $photoPreview.setAttribute('src', event.target.value);
}

$photoUrl.addEventListener('input', updateImage);

/* <li class="row entry-margin" data-entry-id="entry-id">
  <div class="column-half">
    <img src="" alt="dummy entry 1" class="border-radius-4">
  </div>
  <div class="column-half">
  <div class="row font-26">
    <h2 class="image-title-style column-7-8"></h2>
    <i class="fas fa-pen column-8 purple-color text-right"></i>
  </div>
    <p></p>
  </div>
</li> */

function createEntry(entry) {
  var $journalEntry = document.createElement('li');
  $journalEntry.className = 'row entry-margin';
  $journalEntry.setAttribute('data-entry-id', entry.entryId);

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

  var $titleContainer = document.createElement('div');
  $titleContainer.className = 'row font-26';
  $entryText.appendChild($titleContainer);

  var $entryTitle = document.createElement('h2');
  $entryTitle.className = 'image-title-style column-7-8';
  $entryTitle.textContent = entry.title;
  $titleContainer.appendChild($entryTitle);

  var $editIcon = document.createElement('i');
  $editIcon.className = 'fas fa-pen column-8 purple-color text-right';
  $titleContainer.appendChild($editIcon);

  var $entryNotes = document.createElement('p');
  $entryNotes.textContent = entry.notes;
  $entryText.appendChild($entryNotes);

  return $journalEntry;
}

var $diaryEntryForm = document.querySelector('#diary-entry-form');

var $entryList = document.querySelector('#entry-list');
var $noEntries = document.querySelector('#no-entries');
var $views = document.querySelectorAll('.view');

if (data.entries.length !== 0) {
  $noEntries.className = 'hidden';
}

function changeView(targetView) {
  for (var v = 0; v < $views.length; v++) {
    if ($views[v].getAttribute('data-view') === targetView) {
      $views[v].className = 'view';
    } else {
      $views[v].className = 'view hidden';
    }
  }
  data.view = targetView;
}

changeView(data.view);

function addNewEntry(event) {
  event.preventDefault();

  if (data.editing !== null) {
    var $entryID = parseInt(data.editing.getAttribute('data-entry-id'));

    for (var i = 0; i < data.entries.length; i++) {
      if ($entryID === data.entries[i].entryId) {
        data.entries[i].title = $diaryEntryForm.elements.title.value;
        data.entries[i].url = $diaryEntryForm.elements.url.value;
        data.entries[i].notes = $diaryEntryForm.elements.notes.value;
        data.editing.replaceWith(createEntry(data.entries[i]));
        $formTitle.textContent = 'New Entry';
        data.editing = null;
      }
    }

  } else {
    var formData = {};

    formData.title = $diaryEntryForm.title.value;
    formData.url = $diaryEntryForm.url.value;
    formData.notes = $diaryEntryForm.notes.value;

    formData.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(formData);

    $entryList.prepend(createEntry(formData));
  }
  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $diaryEntryForm.reset();
  $noEntries.className = 'hidden';
  changeView('entries');
}

$diaryEntryForm.addEventListener('submit', addNewEntry);

function loadJournalEntries(event) {
  $entryList = document.querySelector('#entry-list');
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(createEntry(data.entries[i]));
  }
}

document.addEventListener('DOMContentLoaded', loadJournalEntries);

var $entriesLink = document.querySelector('#view-entries-link');
var $entryFormLink = document.querySelector('#entry-form-link');

function viewButtonClicked(event) {
  var $dataView = event.target.getAttribute('data-view');

  if ($dataView === 'entry-form') {
    $deleteButton.className = 'deleteButton hidden';
    $formTitle.textContent = 'New Entry';
    $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
    $diaryEntryForm.reset();
  }
  changeView($dataView);
}

$entriesLink.addEventListener('click', viewButtonClicked);
$entryFormLink.addEventListener('click', viewButtonClicked);

var $formTitle = document.querySelector('#form-title');

// delete button data model
// <a href="#" class="deleteButton">Delete Entry</a>

var $deleteButton = document.querySelector('#delete-button');

function editEntry(event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  changeView('entry-form');
  $formTitle.textContent = 'Edit Entry';

  var $editedEntry = event.target.closest('li');
  data.editing = $editedEntry;

  $deleteButton.className = 'deleteButton';

  var $entryID = parseInt(data.editing.getAttribute('data-entry-id'));

  for (var i = 0; i < data.entries.length; i++) {
    if ($entryID === data.entries[i].entryId) {
      $diaryEntryForm.elements.title.value = data.entries[i].title;
      $diaryEntryForm.elements.url.value = data.entries[i].url;
      $diaryEntryForm.elements.notes.value = data.entries[i].notes;
      $photoPreview.setAttribute('src', data.entries[i].url);
    }
  }
}

$entryList.addEventListener('click', editEntry);

var $formView = document.querySelector('#form-view');
var $cancelButton = document.querySelector('#cancel');

function toggleModal(event) {
  if (event.target === $deleteButton) {
    changeView('modal');
    $formView.className = 'view';
  } else if (event.target === $cancelButton) {
    changeView('entry-form');
  }

}

$deleteButton.addEventListener('click', toggleModal);
$cancelButton.addEventListener('click', toggleModal);
