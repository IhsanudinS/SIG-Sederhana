// popup-functions.js
//import $ from 'jquery';

export function setupPopupEditing(map, marker) {
  marker.bindPopup(`<b>Loading...</b>`);

  marker.on('click', function () {
    // Ambil data tempat dari backend berdasarkan ID marker
    const placeId = marker.options.placeId;
    $.get(`http://localhost:3000/places/${placeId}`, function (place) {
      const popupContent = `
        <b>${place.name}</b><br>
        Latitude: ${place.latitude}<br>
        Longitude: ${place.longitude}<br>
        <button class="edit-button">Edit</button>
        <button class="delete-button">Hapus</button>
      `;

      marker.setPopupContent(popupContent);

     // Tambahkan event listener untuk tombol edit
$('.edit-button').on('click', function () {
  const newName = prompt('Masukkan nama tempat baru:', place.name);
  const newLatitudeString = prompt('Masukkan latitude baru:', place.latitude.toString());
  const newLongitudeString = prompt('Masukkan longitude baru:', place.longitude.toString());

  // Konversi nilai latitude dan longitude ke tipe data angka
  const newLatitude = parseFloat(newLatitudeString);
  const newLongitude = parseFloat(newLongitudeString);

  if (newName !== null) {
    // Pastikan nilai yang dimasukkan adalah angka dan tidak null
    if (!isNaN(newLatitude) && !isNaN(newLongitude)) {
      // Kirim permintaan ke backend untuk menyimpan perubahan nama, latitude, dan longitude
      $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/places/${placeId}`,
        contentType: 'application/json',
        data: JSON.stringify({ name: newName, latitude: newLatitude, longitude: newLongitude }),
        success: function (response) {
          console.log(response);
          // Perbarui konten popup di peta setelah perubahan berhasil
          marker.setPopupContent(`
            <b>${newName}</b><br>
            Latitude: ${newLatitude}<br>
            Longitude: ${newLongitude}<br>
            <button class="edit-button">Edit Nama</button>
            <button class="delete-button">Hapus</button>
          `);

          location.reload();
        },
        error: function (error) {
          console.error(error);
          alert('Gagal menyimpan perubahan nama tempat');
        }
      });
    } else {
      alert('Latitude dan Longitude harus berupa angka.');
    }
  }
});

      // Tambahkan event listener untuk tombol delete
      $('.delete-button').on('click', function () {
        // Kirim permintaan ke backend untuk menghapus tempat
        $.ajax({
          method: 'DELETE',
          url: `http://localhost:3000/places/${placeId}`,
          success: function (response) {
            console.log(response);
            // Hapus marker dari peta
            map.removeLayer(marker);
          },
          error: function (error) {
            console.error(error);
            alert('Gagal menghapus tempat');
          }
        });
      });
    });
  });
}
