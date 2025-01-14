// Fungsi untuk mengosongkan semua input
function hapusSemuaInput() {
  document.getElementById("fungsi").value = "";
  document.getElementById("turunan").value = "";
  document.getElementById("nilai-awal").value = "";
  document.getElementById("toleransi").value = "";
  document.getElementById("maks-iterasi").value = "";
  document.getElementById("iterasi").value = "";
  document.getElementById("hasil").value = "";
}

// Fungsi utama untuk menghitung akar menggunakan metode Newton-Raphson
function hitungNewtonRaphson() {
  const fungsiInput = document.getElementById("fungsi").value;
  const turunanInput = document.getElementById("turunan").value;
  const nilaiAwalInput = document.getElementById("nilai-awal").value;
  const toleransiInput = document.getElementById("toleransi").value;
  const maksIterasiInput = document.getElementById("maks-iterasi").value;
  const areaIterasi = document.getElementById("iterasi");
  const hasil = document.getElementById("hasil");

  // Validasi apakah semua input telah diisi
  if (
    !fungsiInput ||
    !turunanInput ||
    !nilaiAwalInput ||
    !toleransiInput ||
    !maksIterasiInput
  ) {
    alert("Harap isi semua kolom input.");
    return;
  }

  try {
    // Kompilasi fungsi f(x) dan turunan f'(x) menggunakan math.js
    const f = math.compile(fungsiInput); //mengubah string fungsiInput menjadi fungsi matematika
    const fTurunan = math.compile(turunanInput);

    let x = parseFloat(nilaiAwalInput); // Konversi nilai awal menjadi angka
    const toleransi = parseFloat(toleransiInput); // Konversi toleransi menjadi angka
    const maksIterasi = parseInt(maksIterasiInput); // Konversi iterasi maksimum menjadi angka

    // untuk mengecek apakah Nan(not a number)
    if (isNaN(x) || isNaN(toleransi) || isNaN(maksIterasi)) {
      alert("Nilai awal, toleransi, dan iterasi maksimum harus berupa angka."); // Validasi angka
      return;
    }

    let jumlahIterasi = 0; // untuk menghitung jumlah iterasi yang dilakukan
    let error = 1; // untuk mengukur seberapa jauh nilai perkiraan saat ini dari nilai akar yang sebenarnya.
    let logIterasi = ""; // String untuk mencatat hasil setiap iterasi
    let akarTerakhir = x; // Menyimpan nilai terakhir x yang dihitung

    // Iterasi menggunakan metode Newton-Raphson
    while (error > toleransi && jumlahIterasi < maksIterasi) {
      const fx = f.evaluate({ x }); // Evaluasi nilai f(x) pada x
      const fpx = fTurunan.evaluate({ x }); // Evaluasi nilai f'(x) pada x

      if (fpx === 0) {
        alert("Turunan f(x) sama dengan 0, metode Newton-Raphson gagal."); // Gagal jika turunan 0
        return;
      }

      let xBaru = x - fx / fpx; // Rumus Newton-Raphson: x - f(x) / f'(x)
      error = Math.abs(xBaru - x); // Hitung error (selisih antara x baru dan x lama)
      akarTerakhir = xBaru; // Perbarui akar terakhir yang ditemukan
      x = xBaru; // Perbarui nilai x

      // Catat hasil iterasi
      logIterasi += `Iterasi ${jumlahIterasi + 1}: x = ${x.toFixed(
        6
      )}, Error = ${error.toFixed(6)}\n`;
      jumlahIterasi++;
    }

    // Tampilkan hasil akhir
    if (error <= toleransi) {
      logIterasi += `Metode Newton-Raphson konvergen setelah ${jumlahIterasi} iterasi.\n`;
      hasil.value = akarTerakhir.toFixed(6); // Simpan hasil akhir
    } else {
      logIterasi += `Metode Newton-Raphson tidak konvergen dalam ${maksIterasi} iterasi.\n`;
      logIterasi += `Akar terakhir yang ditemukan pada iterasi ke-${jumlahIterasi}: ${akarTerakhir.toFixed(
        6
      )}\n`;
      hasil.value = akarTerakhir.toFixed(6); // Tetap tampilkan akar terakhir
    }

    areaIterasi.value = logIterasi; // Tampilkan log iterasi
  } catch (err) {
    alert(`Terjadi kesalahan saat menghitung: ${err.message}`); // Tangani kesalahan
  }
}

// Fungsi untuk menuju halaman informasi
function keHalamanInfo() {
  window.location.href = "info.html";
}
