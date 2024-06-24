// Load saved tasks from local storage
$(document).ready(function () {
  // Load saved tasks from local storage
  if (localStorage.getItem('tasks')) {
    $('#task-list').html(localStorage.getItem('tasks'));
  }

  $("#add-task").click(function () {
    if ($("#text").val().length != 0) {
      var currentTasks = $("#task-list").html();
      var newTask =
        `<div class="to-do-item alert alert-success alert-dismissible fade show d-flex flex-row-reverse justify-content-between  align-items-stretch" role="alert">
              <button type="button" class="btn btn-close" data-bs-dismiss="alert" aria-label="Close">
                <i class="fa-solid fa-delete-left"></i>
              </button>
              <button type="button" class="btn btn-edit btn-gold btn-sm edit-task" aria-label="Edit Task">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <span class="task-text">` + $("#text").val() + `</span>
            </div>`;
      $("#task-list").html(newTask + currentTasks);
      localStorage.setItem('tasks', $('#task-list').html());
      $("#text").val("");
    } else {
      alert("Enter some text!");
    }
  });

  // Toggle task completion
  $(document).on("click", ".alert", function () {
    $(this).toggleClass("text-decoration-line-through");
  });

  // Save tasks to local storage when an alert is dismissed
  $(document).on('closed.bs.alert', '.alert', function () {
    localStorage.setItem('tasks', $('#task-list').html());
  });

  // Edit task functionality
  $(document).on("click", ".edit-task", function (e) {
    e.stopPropagation();
    var taskTextElement = $(this).siblings(".task-text");
    var currentText = taskTextElement.text();
    var newText = prompt("Edit your task:", currentText);
    if (newText !== null && newText.trim() !== "") {
      taskTextElement.text(newText.trim());
      localStorage.setItem('tasks', $('#task-list').html());
    }
  });
});
