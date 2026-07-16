const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const register = async (req, res) => {
    
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Email atau password salah!" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Email atau password salah!" });
        }


        const accessToken = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: '15m' }
        );
        
        const refreshToken = jwt.sign(
            { id: user.id }, 
            process.env.REFRESH_TOKEN_SECRET, 
            { expiresIn: '7d' }
        );

        
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: refreshToken }
        });


        res.status(200).json({ 
            message: "Login Berhasil!", 
            accessToken, 
            refreshToken 
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

module.exports = { register, login };