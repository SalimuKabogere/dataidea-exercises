document.addEventListener("DOMContentLoaded", function () {
  const myForm = document.getElementById("form");
  const myActivity = document.getElementById("activity");
  const myBtn = document.getElementById("submit");
  const activityList = document.getElementById("activity-list");

  // Load the saved activities from localStorage
  const savedActivities = JSON.parse(localStorage.getItem("activities")) || [];
  savedActivities.forEach((activity) => addActivityToDOM(activity));

  // Enable and disable the submit button
  myActivity.addEventListener("keyup", function (e) {
    const value = e.currentTarget.value;
    myBtn.disabled = value === "";
  });

  // Handle the form submission on Enter key press
  myActivity.addEventListener("keyup", function (e) {
    if (e.key === "Enter" && myActivity.value.trim() !== "") {
      e.preventDefault(); // Prevent default form submission
      myForm.submit(); // Programmatically submit the form
    }
  });

  // Handle form submission
  myForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from being auto-submitted

    const activity = myActivity.value.trim();
    if (activity !== "") {
      addActivityToDOM(activity);
      saveActivity(activity);

      myActivity.value = ""; // Clear input
      myBtn.disabled = true;
    }
  });

  function addActivityToDOM(activity) {
    const listItem = document.createElement("li");
    listItem.textContent = activity;
    listItem.classList.add("activity-item");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");

    editButton.addEventListener("click", function () {
      const newActivity = prompt("Edit your activity:", activity);
      if (newActivity !== null && newActivity.trim() !== "") {
        updateActivity(activity, newActivity);
        listItem.textContent = newActivity;
        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", function () {
      activityList.removeChild(listItem);
      deleteActivity(activity);
    });

    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    activityList.appendChild(listItem);
  }

  function saveActivity(activity) {
    const activities = JSON.parse(localStorage.getItem("activities")) || [];
    activities.push(activity);
    localStorage.setItem("activities", JSON.stringify(activities));
  }

  function updateActivity(oldActivity, newActivity) {
    const activities = JSON.parse(localStorage.getItem("activities")) || [];
    const activityIndex = activities.indexOf(oldActivity);
    if (activityIndex > -1) {
      activities[activityIndex] = newActivity;
      localStorage.setItem("activities", JSON.stringify(activities));
    }
  }

  function deleteActivity(activity) {
    let activities = JSON.parse(localStorage.getItem("activities")) || [];
    activities = activities.filter((act) => act !== activity);
    localStorage.setItem("activities", JSON.stringify(activities));
  }
});
