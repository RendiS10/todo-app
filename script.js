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

  // Membuat tabel jika belum ada
  function ensureTaskTable() {
    if (!document.getElementById("taskTable")) {
      const table = document.createElement("table");
      table.id = "taskTable";
      table.className = "task-table";
      table.innerHTML = `
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Tugas</th>
            <th>Deskripsi</th>
            <th>Jatuh Tempo</th>
            <th>Prioritas</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;
      taskList.appendChild(table);
    }
  }

  // Hapus task (baris tabel)
  function addDeleteButton(row) {
    const delBtn = document.createElement("button");
    delBtn.className = "btn-delete";
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delBtn.title = "Hapus Tugas";
    delBtn.onclick = function () {
      row.classList.add("fade-out");
      setTimeout(() => row.remove(), 400);
      showNotification("Tugas dihapus", "danger");
    };
    return delBtn;
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

    ensureTaskTable();
    const table = document.getElementById("taskTable");
    const tbody = table.querySelector("tbody");
    const row = document.createElement("tr");
    row.className = "highlight";
    // Hitung nomor urut
    const no = tbody.children.length + 1;
    row.innerHTML = `
      <td class="task-no">${no}</td>
      <td class="task-title">${name}</td>
      <td class="task-desc">${desc}</td>
      <td class="task-footer"><i class="fa-regular fa-calendar"></i> ${due}</td>
      <td><span class="task-priority ${priorityClass}">${priorityLabel}</span></td>
      <td></td>
    `;
    // Tambahkan tombol hapus ke kolom aksi
    row.children[5].appendChild(addDeleteButton(row));
    tbody.appendChild(row);
    // Update nomor urut jika ada penghapusan
    function updateRowNumbers() {
      Array.from(tbody.children).forEach((tr, idx) => {
        tr.querySelector(".task-no").textContent = idx + 1;
      });
    }
    // Tambahkan update nomor urut pada hapus
    row.querySelector(".btn-delete").onclick = function () {
      row.classList.add("fade-out");
      setTimeout(() => {
        row.remove();
        updateRowNumbers();
      }, 400);
      showNotification("Tugas dihapus", "danger");
    };
    setTimeout(() => row.classList.remove("highlight"), 800);
    showNotification("Tugas berhasil ditambahkan!");
    taskForm.reset();
    document.getElementById("taskName").focus();
  });
});
