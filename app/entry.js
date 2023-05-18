'use strict';
const toggle_buttons = document.querySelectorAll('.availability-toggle-button');
toggle_buttons.forEach(button => {
  button.addEventListener('click', async () => {
    const scheduleId = button.getAttribute('data-schedule-id');
    const userId = button.getAttribute('data-user-id');
    const candidateId = button.getAttribute('data-candidate-id');
    const availability = parseInt(button.getAttribute('data-availability'));
    const nextAvailability = (availability + 1) % 3;
    const url = `/schedules/${scheduleId}/users/${userId}/candidates/${candidateId}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ availability: nextAvailability })
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    }).then(data => {
      button.setAttribute('data-availability', data.availability);
      const availabilityLabels = ['欠', '？', '出'];
      button.textContent = availabilityLabels[data.availability];
    });
  });
});