/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};


var toggle_buttons = document.querySelectorAll('.availability-toggle-button');
toggle_buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    var scheduleId = button.getAttribute('data-schedule-id');
    var userId = button.getAttribute('data-user-id');
    var candidateId = button.getAttribute('data-candidate-id');
    var availability = parseInt(button.getAttribute('data-availability'));
    var nextAvailability = (availability + 1) % 3;
    var url = "/schedules/".concat(scheduleId, "/users/").concat(userId, "/candidates/").concat(candidateId);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        availability: nextAvailability
      })
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    }).then(function (data) {
      button.setAttribute('availability', data.availability);
      var availabilityLabels = ['欠', '？', '出'];
      button.textContent = availabilityLabels[data.availability];
    });
  });
});
/******/ })()
;