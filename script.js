// ==========================
// MTs Baitul Muttaqin Website Script (Final)
// ==========================

// ===== DATA UTAMA SEKOLAH =====
const schoolData = {
  nama: "MTs BAITUL MUTTAQIN",
  tahunBerdiri: 1994,
  kepalaSekolah: "Ir. Ahmad Dupriansyah, S.Pd, MM",
  guru: { tetap: 32, tidakTetap: 4 },
  stafTU: 6,
  tenagaLain: 5,
  siswa: {
    kelas7: { L: 60, P: 45 },
    kelas8: { L: 58, P: 50 },
    kelas9: { L: 55, P: 48 }
  },
  programUnggulan: {
    Tahfidz: {
      title: "📖 Tahfidz Al-Qur'an",
      short: "Penguatan hafalan & pemahaman Al-Qur'an untuk seluruh siswa.",
      desc: `
        <p><strong>Tujuan:</strong> Meningkatkan kecintaan dan penguasaan Al-Qur'an.</p>
        <p><strong>Kegiatan:</strong> Kelas tahfidz harian, setoran mingguan, muroja’ah, dan mentoring murottal.</p>
        <p><strong>Manfaat:</strong> Membentuk karakter religius dan disiplin melalui Al-Qur'an.</p>
      `
    },
    EnglishArabicDay: {
      title: "🗣️ English & Arabic Day",
      short: "Latihan komunikasi bahasa Inggris dan Arab setiap minggu.",
      desc: `
        <p><strong>Tujuan:</strong> Meningkatkan kemampuan komunikasi lisan dalam bahasa Inggris dan Arab.</p>
        <p><strong>Kegiatan:</strong> Roleplay, conversation club, pidato, dan vocabulary challenge.</p>
        <p><strong>Manfaat:</strong> Menumbuhkan percaya diri dan kemampuan bahasa global serta islami.</p>
      `
    },
    MadrasahHijau: {
      title: "🌿 Madrasah Hijau (Eco-Madrasah)",
      short: "Program cinta lingkungan melalui kebersihan & penghijauan sekolah.",
      desc: `
        <p><strong>Tujuan:</strong> Menanamkan tanggung jawab menjaga alam dan kebersihan.</p>
        <p><strong>Kegiatan:</strong> Pembuatan taman sekolah, bank sampah, lomba kebersihan kelas, dan daur ulang.</p>
        <p><strong>Manfaat:</strong> Membentuk budaya madrasah hijau, sehat, dan islami.</p>
      `
    },
    SoundSystem: {
      title: "🎧 Seni Sound System Islami",
      short: "Pelatihan teknis audio untuk acara keagamaan dan kegiatan sekolah.",
      desc: `
        <p><strong>Tujuan:</strong> Melatih keterampilan teknis siswa dalam bidang audio dan peralatan sound system.</p>
        <p><strong>Kegiatan:</strong> Workshop, praktik di acara madrasah dan masjid, lomba setting sound, serta perawatan alat.</p>
        <p><strong>Manfaat:</strong> Membekali siswa dengan keahlian praktis dan tanggung jawab dalam kegiatan islami.</p>
      `
    }
  }
};

// ===== PERHITUNGAN SISWA =====
function calcSiswaTotals() {
  const kelas = schoolData.siswa;
  let totals = { L: 0, P: 0, total: 0 };
  for (const k of Object.keys(kelas)) {
    totals.L += kelas[k].L;
    totals.P += kelas[k].P;
  }
  totals.total = totals.L + totals.P;
  return totals;
}

// ===== RENDER STATISTIK =====
function renderStatistics() {
  const totals = calcSiswaTotals();
  const guruTotal = schoolData.guru.tetap + schoolData.guru.tidakTetap;

  const summaryTextEl = document.getElementById('summaryText');
  if (summaryTextEl) summaryTextEl.textContent = `Guru: ${guruTotal} • Siswa: ${totals.total}`;

  const tbody = document.getElementById('siswaTableBody');
  if (tbody) {
    tbody.innerHTML = "";
    let kelasIndex = 7;
    for (const key of Object.keys(schoolData.siswa)) {
      const { L, P } = schoolData.siswa[key];
      const total = L + P;
      tbody.innerHTML += `<tr><td>Kelas ${kelasIndex}</td><td>${L}</td><td>${P}</td><td>${total}</td></tr>`;
      kelasIndex++;
    }
  }

  const totalsAll = calcSiswaTotals();
  const rasio = (totals.total / (schoolData.guru.tetap || 1)).toFixed(1);
  const footer = document.getElementById('siswaFooter');
  if (footer) {
    footer.innerHTML = `
      <tr><td><strong>Total</strong></td>
      <td><strong>${totalsAll.L}</strong></td>
      <td><strong>${totalsAll.P}</strong></td>
      <td><strong>${totalsAll.total}</strong></td></tr>`;
  }

  const rasioEl = document.getElementById('rasioText');
  if (rasioEl) rasioEl.textContent = `1 : ${rasio} (setiap 1 guru mengampu ±${rasio} siswa)`;

  // 🟢 Tambahkan isi penjelasan modal statistik
  const modalStats = document.getElementById("modalStats");
  if (modalStats) {
    modalStats.innerHTML = `
      <h4>📊 Statistik Singkat Madrasah</h4>
      <ul>
        <li><strong>Guru Tetap:</strong> ${schoolData.guru.tetap}</li>
        <li><strong>Guru Tidak Tetap:</strong> ${schoolData.guru.tidakTetap}</li>
        <li><strong>Staf TU:</strong> ${schoolData.stafTU}</li>
        <li><strong>Tenaga Kependidikan Lain:</strong> ${schoolData.tenagaLain}</li>
        <li><strong>Total Siswa:</strong> ${totalsAll.total} (L: ${totalsAll.L}, P: ${totalsAll.P})</li>
        <li><strong>Rasio Guru–Siswa:</strong> 1 : ${rasio}</li>
      </ul>
      <p>📘 Data di atas menggambarkan kondisi terkini jumlah tenaga pendidik dan peserta didik di <strong>MTs Baitul Muttaqin</strong>. Informasi ini diperbarui secara berkala untuk menjaga transparansi dan kualitas pendidikan.</p>
    `;
  }

  renderProgramCards();
}

// ===== PROGRAM UNGGULAN =====
function renderProgramCards() {
  const programSection = document.querySelector('#unggulan .program-grid');
  if (!programSection) return;
  programSection.innerHTML = '';

  const order = ['Tahfidz', 'EnglishArabicDay', 'MadrasahHijau', 'SoundSystem'];
  for (const key of order) {
    const data = schoolData.programUnggulan[key];
    if (!data) continue;
    const card = document.createElement('div');
    card.className = 'program-card enhanced';
    card.innerHTML = `
      <div class="program-card-inner">
        <h3 class="program-title">${data.title}</h3>
        <p class="program-short">${data.short}</p>
        <div class="program-actions">
          <button class="btn btn-outline" onclick="openProgramModal('${key}')">Detail</button>
        </div>
      </div>`;
    programSection.appendChild(card);
  }
}

// ===== TAB =====
function openTab(tabName, element) {
  document.querySelectorAll(".content-section").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".nav-button").forEach(btn => btn.classList.remove("active"));
  document.getElementById(tabName)?.classList.add("active");
  element?.classList.add("active");
}

// ===== MODAL =====
function openModal(id) {
  document.getElementById(id).style.display = "block";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
window.onclick = e => {
  document.querySelectorAll(".modal").forEach(m => {
    if (e.target === m) m.style.display = "none";
  });
};

// ===== MODAL PROGRAM =====
function openProgramModal(key) {
  const data = schoolData.programUnggulan[key];
  document.getElementById('programTitle').textContent = data.title;
  document.getElementById('programContent').innerHTML = data.desc;
  openModal('programModal');
}

// ===== STRUKTUR ORGANISASI =====
const strukturData = {
  kepala: {
    title: "👳 Kepala Madrasah",
    content: `
      <p><strong>Nama:</strong> Ir. Ahmad Dupriansyah, S.Pd, MM</p>
      <p><strong>Tugas:</strong> Memimpin dan mengarahkan seluruh kegiatan pendidikan di madrasah.</p>
    `
  },

  wakil: {
    title: "🤝 Wakil Kepala Madrasah (Kurikulum)",
    content: `
      <p><strong>Nama:</strong> Shalahuddin, S.Pd.I</p>
      <p><strong>Tugas:</strong> Mengatur pelaksanaan kegiatan belajar mengajar, jadwal, dan supervisi guru.</p>
    `
  },

  wakaKesiswaan: {
    title: "🎓 Waka Kesiswaan",
    content: `
      <p><strong>Nama:</strong> Suriadi</p>
      <p><strong>Tugas:</strong> Membina kedisiplinan, karakter, dan kegiatan OSIS serta ekstrakurikuler siswa.</p>
    `
  },

  wakaSarpras: {
    title: "🧰 Waka Sarpras",
    content: `
      <p><strong>Nama:</strong> Fahrurazi</p>
      <p><strong>Tugas:</strong> Mengelola sarana dan prasarana pendidikan agar siap pakai dan terawat dengan baik.</p>
    `
  },

  wakaHumas: {
    title: "📣 Waka Humas",
    content: `
      <p><strong>Nama:</strong> Muh. Ilyas</p>
      <p><strong>Tugas:</strong> Menjalin kerja sama dengan masyarakat, instansi, dan lembaga lain.</p>
    `
  },

  komite: {
    title: "🏫 Komite Madrasah",
    content: `
      <p><strong>Ketua:</strong> H. Sulaiman</p>
      <p><strong>Sekretaris:</strong> H. Masdar</p>
      <p><strong>Tugas:</strong> Mendukung kebijakan madrasah dan menjembatani hubungan antara sekolah dan masyarakat.</p>
    `
  },

  serbaBakti: {
    title: "🤲 Serba Bakti",
    content: `
      <p><strong>Penanggung Jawab:</strong> Ust. Sahrul</p>
      <p><strong>Tugas:</strong> Menggerakkan kegiatan sosial, kebersihan, dan keagamaan di madrasah.</p>
    `
  },

  pelaksanaTeknis: {
    title: "⚙️ Pelaksana Teknis",
    content: `
      <p><strong>Penanggung Jawab:</strong> Ust. Junaidi</p>
      <p><strong>Tugas:</strong> Menangani kegiatan teknis operasional dan perawatan fasilitas madrasah.</p>
    `
  },

  bendahara: {
    title: "💰 Bendahara",
    content: `
      <p><strong>Nama:</strong> Ibu Nur Aini</p>
      <p><strong>Tugas:</strong> Mengatur keuangan madrasah dengan transparan dan akuntabel.</p>
    `
  },

  operator: {
    title: "💻 Operator Madrasah",
    content: `
      <p><strong>Nama:</strong> Bapak Irwan</p>
      <p><strong>Tugas:</strong> Mengelola data EMIS, raport digital, dan sistem informasi sekolah.</p>
    `
  },

  perpustakaan: {
    title: "📚 Perpustakaan",
    content: `
      <p><strong>Penanggung Jawab:</strong> Ibu Rahmawati</p>
      <p><strong>Tugas:</strong> Mengelola koleksi buku, kegiatan literasi, dan layanan pustaka digital.</p>
    `
  },

  laboratorium: {
    title: "🔬 Laboratorium IPA & Komputer",
    content: `
      <p><strong>Penanggung Jawab:</strong> Ust. Faisal</p>
      <p><strong>Tugas:</strong> Menunjang kegiatan praktikum IPA dan pelatihan komputer siswa.</p>
    `
  },

  guru: {
    title: "👨‍🏫 Guru Program Unggulan",
    content: `
      <ul>
        <li>📖 <strong>Tahfidz Al-Qur'an:</strong> Ustadz Arif Rahman</li>
        <li>🗣️ <strong>English & Arabic Day:</strong> Muhammad Abdillah</li>
        <li>🌿 <strong>Madrasah Hijau:</strong> Ahmad</li>
        <li>🎧 <strong>Seni Sound System Islami:</strong> Khairul Rijal</li>
      </ul>
      <p><strong>Koordinator Guru Program:</strong> Shalahuddin, S.Pd.I</p>
    `
  },

  osis: {
    title: "👩‍🎓 OSIS",
    content: `
      <p><strong>Ketua:</strong> Yamani</p>
      <p><strong>Pembina:</strong> Pahriadi, S.Pd.I</p>
      <p><strong>Tugas:</strong> Menumbuhkan kepemimpinan dan tanggung jawab sosial siswa.</p>
    `
  }
};

function openStrukturModal(key) {
  const data = strukturData[key];
  if (!data) return;
  document.getElementById("strukturModalTitle").textContent = data.title;
  document.getElementById("strukturModalContent").innerHTML = data.content;
  openModal("strukturModal");
}

// ===== ABOUT =====
function openAboutModal() {
  document.getElementById('aboutModalTitle').textContent = "Profil Singkat MTs Baitul Muttaqin";
  document.getElementById('aboutModalContent').innerHTML = `
    <p><strong>MTs Baitul Muttaqin</strong> berdiri sejak tahun 1994. Berkomitmen membentuk generasi berilmu, beriman, dan berakhlak mulia dengan keseimbangan ilmu umum dan agama.</p>`;
  openModal('aboutModal');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', renderStatistics);