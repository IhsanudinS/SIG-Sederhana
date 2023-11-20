// map-functions.js
//import L from 'leaflet';
import { setupPopupEditing } from './popup-functions.js';

export function initMap() {
  // Tentukan batas wilayah yang ingin ditampilkan (contoh: Madiun)
  const madiunBounds = L.latLngBounds(L.latLng(-7.6086, 111.5116), L.latLng(-7.6249, 111.5596));

  // Inisialisasi peta Leaflet dengan batas wilayah
  const map = L.map('map', {
    center: madiunBounds.getCenter(),
    zoom: 14,
    maxBounds: madiunBounds,  // Set batas maksimum peta
    maxBoundsViscosity: 0.95, // Efek viscous untuk menjaga peta tetap dalam batas
  });

  // Tambahkan layer peta OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Ambil data semua tempat dari backend
  $.get('http://localhost:3000/places', function (places) {
    // Tampilkan semua titik pada peta
    places.forEach(function (place) {
      const marker = L.marker([place.latitude, place.longitude]).addTo(map);
      marker.options.placeId = place.id; // Set placeId ke options agar dapat diakses saat marker diklik

      // Panggil fungsi untuk menangani pop-up editing
      setupPopupEditing(map, marker);
    });
  });

  return map;
}
