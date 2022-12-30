const form = document.querySelector("#meyve-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const meyveAdi = document.querySelector("#meyve-adi").value;
  aramaYap(meyveAdi);
});

const meyveler = {};
const verileriAl = () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "meyve_verileri.txt");
  xhr.onload = () => {
    if (xhr.status === 200) {
      const veriler = xhr.responseText.split("\n");
      veriler.forEach((veri) => {
        const [meyve, vitaminler, besinDegerleri] = veri.split(";");
        meyveler[meyve] = {vitaminler, besinDegerleri};
      });
    }
  };
  xhr.send();
};
verileriAl();

const aramaYap = (meyveAdi) => {
  meyveAdi = meyveAdi.toLowerCase();
  for (const [meyve, bilgiler] of Object.entries(meyveler)) {
    if (meyve.toLowerCase().includes(meyveAdi) || meyveAdi.includes(meyve.toLowerCase())) {
      const sonucDiv = document.querySelector("#sonuc");
      sonucDiv.innerHTML = `
        <p>Vitaminler: ${bilgiler.vitaminler}</p>
        <p>Besin Değerleri: ${bilgiler.besinDegerleri}</p>
      `;
      return;
    }
  }
  alert("Üzgünüz, girdiğiniz meyve veritabanımızda bulunamadı.");
};
