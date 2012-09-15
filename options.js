
// Saves options to localStorage.
function save() {
  var input = document.getElementById("oldage");
  localStorage["old_age_mins"] = input.value;
  chrome.extension.getBackgroundPage().loadConfig();
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var old_age_mins = localStorage["old_age_mins"];
  if (!old_age_mins) {
    old_age_mins =  60*4;
  }

  var input = document.getElementById("oldage");
  input.value = old_age_mins;
}


document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#save').addEventListener('click',  save);

  restore_options();
});
