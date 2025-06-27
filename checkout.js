document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("checkout-form");
  const tableBody = document.getElementById("tagihan-table-body");

  // Ambil data tagihan dari localStorage jika ada
  let tagihanList = JSON.parse(localStorage.getItem("tagihanList")) || [];

  function showPaymentCard(idx) {
    // Cek apakah sudah ada card, jika ada hapus dulu
    let oldCard = document.getElementById("payment-card");
    if (oldCard) oldCard.remove();

    // Hitung pajak 10% dari total tagihan
    const totalTagihan = parseFloat(tagihanList[idx].total);
    const pajak = Math.round(totalTagihan * 0.1 * 100) / 100;
    const totalPlusPajak = Math.round((totalTagihan + pajak) * 100) / 100;

    // Buat card pembayaran
    const card = document.createElement("div");
    card.id = "payment-card";
    card.style.position = "fixed";
    card.style.top = "50%";
    card.style.left = "50%";
    card.style.transform = "translate(-50%, -50%)";
    card.style.background = "#fff";
    card.style.boxShadow = "0 2px 16px rgba(0,0,0,0.2)";
    card.style.padding = "32px 24px";
    card.style.borderRadius = "10px";
    card.style.zIndex = "9999";
    card.style.minWidth = "320px";

    card.innerHTML = `
      <h3>Pembayaran Tagihan</h3>
      <p><b>Nama Tagihan:</b> ${tagihanList[idx].nama}</p>
      <p><b>Total Tagihan:</b> Rp ${totalTagihan}</p>
      <p><b>Pajak (10%):</b> Rp ${pajak}</p>
      <p><b>Total Bayar:</b> <span style="color:#4f8cff;font-weight:bold;">Rp ${totalPlusPajak}</span></p>
      <button id="bayar-btn-card" style="background:#4f8cff;color:#fff;padding:10px 24px;border:none;border-radius:4px;">Bayar</button>
      <button type="button" id="close-card" style="margin-left:10px;">Batal</button>
    `;
    document.body.appendChild(card);

    // Event close
    card.querySelector("#close-card").onclick = function () {
      card.remove();
    };
    // Event bayar
    card.querySelector("#bayar-btn-card").onclick = function () {
      alert("Pembayaran Berhasil!");
      tagihanList.splice(idx, 1);
      localStorage.setItem("tagihanList", JSON.stringify(tagihanList));
      renderTable();
      card.remove();
    };
  }

  // Fungsi render tabel
  function renderTable() {
    tableBody.innerHTML = "";
    tagihanList.forEach((item, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>${item.nama}</td>
        <td>${item.total}</td>
        <td><button class="bayar-btn">Bayar</button></td>
      `;
      // Event tombol bayar
      tr.querySelector(".bayar-btn").addEventListener("click", function () {
        showPaymentCard(idx);
      });
      tableBody.appendChild(tr);
    });
  }

  // Render tabel saat halaman dimuat
  renderTable();

  // Event submit form
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const nama = document.getElementById("nama-tagihan").value;
    const total = document.getElementById("total-tagihan").value;
    const tanggal = document.getElementById("tanggal-tagihan").value;
    tagihanList.push({ nama, total, tanggal });
    localStorage.setItem("tagihanList", JSON.stringify(tagihanList));
    renderTable();
    form.reset();
  });
});
