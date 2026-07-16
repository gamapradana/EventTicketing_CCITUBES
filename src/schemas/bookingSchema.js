const { z } = require('zod');

const bookingSchema = z.object({
    body: z.object({
        eventId: z.preprocess((val) => parseInt(val), z.number().positive("Event ID harus angka positif")),
    })
});

module.exports = { bookingSchema };