/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('journal-entries');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

function addLocalStorage(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('journal-entries', dataJSON);
}

window.addEventListener('beforeunload', addLocalStorage);
