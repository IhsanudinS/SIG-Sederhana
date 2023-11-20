const express  = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./server/db');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint untuk mendapatkan semua data tempat
app.get('/places', async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query('SELECT * FROM places');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    if (conn) conn.release();
  }
});

// Endpoint untuk mendapatkan data tempat berdasarkan ID
app.get('/places/:id', async (req, res) => {
  const id = req.params.id;
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query('SELECT * FROM places WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send('Place not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    if (conn) conn.release();
  }
});

// Endpoint untuk menambahkan data tempat baru
app.post('/places', async (req, res) => {
  const { name, latitude, longitude } = req.body;
  const conn = await pool.getConnection();
  try {
    // Cek apakah nama tempat sudah ada
    const existingPlace = await conn.query('SELECT * FROM places WHERE name = ?', [name]);
    if (existingPlace.length > 0) {
      res.status(400).send('Place with the same name already exists');
    } else {
      // Jika tidak ada, tambahkan tempat baru dengan nilai createdAt dan updatedAt
      await conn.query('INSERT INTO places (name, latitude, longitude, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())', [name, latitude, longitude]);
      res.send('Place added successfully');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    if (conn) conn.release();
  }
});

// Endpoint untuk mengupdate data tempat berdasarkan ID
app.put('/places/:id', async (req, res) => {
  const { name, latitude, longitude } = req.body;
  const id = req.params.id;
  const conn = await pool.getConnection();
  try {
    // Perbarui tempat dengan nilai updatedAt
    await conn.query('UPDATE places SET name=?, latitude=?, longitude=?, updatedAt=NOW() WHERE id=?', [name, latitude, longitude, id]);
    res.send('Place updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    if (conn) conn.release();
  }
});

// Endpoint untuk menghapus data tempat berdasarkan ID
app.delete('/places/:id', async (req, res) => {
  const id = req.params.id;
  const conn = await pool.getConnection();
  try {
    await conn.query('DELETE FROM places WHERE id=?', [id]);
    res.send('Place deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    if (conn) conn.release();
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});