const { z, email } = require('zod');

const registerSchema = z.object({
    name: z.string().min(3, "nama wajib diisi, minimal 3 karakter"),
    email: z.string().email("format email tidak valid!"),
    password: z.string().min(6, "Password terlalu pendek, minimal 6 karakter "),
    role: z.enum(["CUSTOMER", "ORGANIZER", "ADMIN"], {
        errorMap: () => ({ message: "Role harus CUSTOMER, ORGANIZER, atau ADMIN"})
    }).optional()
});

module.exports = { registerSchema };