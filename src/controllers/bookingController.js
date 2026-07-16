const { PrismaClient } = require('@prisma/client');
const QRCode = require('qrcode'); 
const prisma = new PrismaClient();

const bookTicket = async (req, res) => {
    try {
        const { eventId } = req.body;
        const customerId = req.user.id; 

        const result = await prisma.$transaction(async (tx) => {
            const event = await tx.event.findUnique({ where: { id: parseInt(eventId) } });
            
            if (!event) throw new Error("Event tidak ditemukan");
            if (event.quota < 1) throw new Error("Mohon maaf, kuota tiket sudah habis!");

            await tx.event.update({
                where: { id: event.id },
                data: { quota: { decrement: 1 } }
            });

            const booking = await tx.booking.create({
                data: {
                    eventId: event.id,
                    customerId: customerId,
                    status: "BOOKED"
                }
            });

            
            const ticketData = `TIX-${booking.id}-EVT${event.id}-USR${customerId}`;
            
            
            const qrCodeImage = await QRCode.toDataURL(ticketData);

            
            return {
                ...booking,
                ticketCode: ticketData,
                eTicketQR: qrCodeImage
            };
        });

        res.status(201).json({ message: "Booking tiket berhasil!", data: result });
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
};

module.exports = { bookTicket };