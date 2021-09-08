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
