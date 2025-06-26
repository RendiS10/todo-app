document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("taskForm");
  const taskList = document.getElementById("taskList");

  // Notifikasi
  function showNotification(message, type = "success") {
    let notif = document.createElement("div");
    notif.className = `notif notif-${type}`;
    notif.innerText = message;
    document.body.appendChild(notif);
    setTimeout(() => {
      notif.classList.add("show");
    }, 10);
    setTimeout(() => {
      notif.classList.remove("show");
      setTimeout(() => notif.remove(), 400);
    }, 2000);
  }

  // Hapus task
  function addDeleteButton(card) {
    const delBtn = document.createElement("button");
    delBtn.className = "btn-delete";
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delBtn.title = "Hapus Tugas";
    delBtn.onclick = function () {
      card.classList.add("fade-out");
      setTimeout(() => card.remove(), 400);
      showNotification("Tugas dihapus", "danger");
    };
    card.querySelector(".task-header").appendChild(delBtn);
  }

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("taskName").value.trim();
    const desc = document.getElementById("taskDescription").value.trim();
    const due = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;

    if (!name || !desc || !due || !priority) {
      showNotification("Semua field harus diisi!", "danger");
      return;
    }

    // Format priority class
    let priorityClass = "priority-" + priority;
    let priorityLabel =
      priority === "low"
        ? "Rendah"
        : priority === "medium"
        ? "Sedang"
        : "Tinggi";

    // Create task card
    const card = document.createElement("div");
    card.className = "task-card highlight";
    card.innerHTML = `
      <div class="task-header">
        <span class="task-title">${name}</span>
        <span class="task-priority ${priorityClass}">${priorityLabel}</span>
      </div>
      <div class="task-desc">${desc}</div>
      <div class="task-footer">
        <i class="fa-regular fa-calendar"></i> ${due}
      </div>
    `;
    addDeleteButton(card);
    taskList.appendChild(card);
    setTimeout(() => card.classList.remove("highlight"), 800);
    showNotification("Tugas berhasil ditambahkan!");
    taskForm.reset();
    document.getElementById("taskName").focus();
  });
});
