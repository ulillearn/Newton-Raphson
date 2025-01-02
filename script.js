// Fungsi untuk membersihkan semua input
function clearFields() {
  document.getElementById("function").value = "";
  document.getElementById("derivative").value = "";
  document.getElementById("initial").value = "";
  document.getElementById("tolerance").value = "";
  document.getElementById("max-iterations").value = "";
  document.getElementById("iterations").value = "";
  document.getElementById("result").value = "";
}

// Fungsi utama untuk menghitung akar menggunakan metode Newton-Raphson
function calculate() {
  const funcInput = document.getElementById("function").value;
  const derivativeInput = document.getElementById("derivative").value;
  const initialInput = document.getElementById("initial").value;
  const toleranceInput = document.getElementById("tolerance").value;
  const maxIterationsInput = document.getElementById("max-iterations").value;

  const iterationsArea = document.getElementById("iterations");
  const result = document.getElementById("result");

  // Validasi input
  if (
    !funcInput ||
    !derivativeInput ||
    !initialInput ||
    !toleranceInput ||
    !maxIterationsInput
  ) {
    alert("Harap isi semua kolom input.");
    return;
  }

  try {
    // Menggunakan math.js untuk kompilasi fungsi dan turunan
    const f = math.compile(funcInput);
    const fPrime = math.compile(derivativeInput);
    let x = parseFloat(initialInput); // Nilai awal
    const tolerance = parseFloat(toleranceInput); // Toleransi error
    const maxIterations = parseInt(maxIterationsInput); // Iterasi maksimum

    if (isNaN(x) || isNaN(tolerance) || isNaN(maxIterations)) {
      alert(
        "Input awal, toleransi, dan jumlah iterasi maksimum harus berupa angka."
      );
      return;
    }

    let iterCount = 0;
    let error = 1;
    let iterations = "";

    // Proses iterasi dengan metode Newton-Raphson
    while (error > tolerance && iterCount < maxIterations) {
      const fx = f.evaluate({ x });
      const fpx = fPrime.evaluate({ x });

      if (fpx === 0) {
        alert("Turunan f(x) sama dengan 0, metode Newton-Raphson gagal.");
        return;
      }

      let xNew = x - fx / fpx; // Rumus Newton-Raphson
      error = Math.abs(xNew - x); // Perhitungan error
      x = xNew;

      iterations += `Iterasi ${iterCount + 1}: x = ${x.toFixed(
        6
      )}, Error = ${error.toFixed(6)}\n`;
      iterCount++;
    }

    // Menampilkan hasil dan iterasi
    if (error <= tolerance) {
      iterations += `Metode Newton-Raphson konvergen setelah ${iterCount} iterasi.\n`;
      result.value = x.toFixed(6);
    } else {
      iterations += `Metode Newton-Raphson tidak konvergen dalam ${maxIterations} iterasi.\n`;
      result.value = "Tidak ditemukan";
    }

    iterationsArea.value = iterations;
  } catch (err) {
    alert(`Terjadi kesalahan saat menghitung: ${err.message}`);
  }
}

// Fungsi untuk menuju halaman info
function goToInfoPage() {
  window.location.href = "info.html";
}
