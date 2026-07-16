const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

const eventRoutes = require('./src/routes/eventRoutes');
app.use('/api/events', eventRoutes);

const bookingRoutes = require('./src/routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes); 

app.get('/', (req, res) => {
    res.json({ message: "API Event Ticketing berjalan dengan baik" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
});

app.listen(PORT, () => {
 
    console.log(`Server berjalan di http://localhost:${PORT}`);
});