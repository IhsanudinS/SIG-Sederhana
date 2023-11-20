function addLocation() {
  const name = document.getElementById('name').value;
  const latitude = parseFloat(document.getElementById('latitude').value);
  const longitude = parseFloat(document.getElementById('longitude').value);

  fetch('http://localhost:3000/places', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, latitude, longitude }),
  })
  .then((response) => response.text())
  .then((result) => {
      alert(result);

      // Muat ulang halaman setelah menambahkan lokasi
      location.reload();
  })
  .catch((error) => {
      console.error('Error:', error);
      alert('Gagal menambahkan lokasi');
  });
}
