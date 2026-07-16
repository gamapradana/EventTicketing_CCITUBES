const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createEvent = async (req, res) => {
    try {
        const { title, quota } = req.body;
        const posterPath = req.file ? `/uploads/${req.file.filename}` : null;
        const event = await prisma.event.create({
            data: {
                title,
                quota: parseInt(quota),
                Poster: posterPath,
                organizerId: req.user.id
            }
        });
        res.status(201).json({ message: "Event berhasil dibuat!", data: event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany({
            include: { organizer: { select: { name: true } } }
        });
        res.status(200).json({ data: events });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { createEvent, getAllEvents };