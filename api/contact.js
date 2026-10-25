// Funcion serverless de Vercel: recibe el formulario de contacto y envia el correo por Gmail.
// En local se sigue usando server/server.js (npm run dev).
const nodemailer = require('nodemailer');

const escapeHtml = (str) =>
    String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ success: false, message: 'Metodo no permitido' });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Faltan variables de entorno EMAIL_USER y/o EMAIL_PASS');
        return res.status(500).json({ success: false, message: 'Servidor de correo no configurado' });
    }

    const { nombre, email, asunto, mensaje } = req.body || {};

    if (!nombre || !email || !asunto || !mensaje) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ success: false, message: 'Email invalido' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO || process.env.EMAIL_USER,
            replyTo: email,
            subject: `Nuevo mensaje de ${nombre}: ${asunto}`,
            html: `
                <h2>Nuevo mensaje desde tu portafolio</h2>
                <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>Asunto:</strong> ${escapeHtml(asunto)}</p>
                <p><strong>Mensaje:</strong></p>
                <div style="background: #f5f5f5; padding: 15px; margin: 10px 0; border-left: 4px solid #2563eb;">
                    ${escapeHtml(mensaje).replace(/\n/g, '<br>')}
                </div>
                <hr>
                <p><small>Enviado desde tu formulario de contacto el ${new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })}</small></p>
            `
        });
        return res.status(200).json({ success: true, message: 'Mensaje enviado correctamente' });
    } catch (error) {
        console.error('Error enviando correo:', error);
        const message = error.code === 'EAUTH'
            ? 'Error de autenticacion con Gmail. Verifica las credenciales'
            : 'Error al enviar el mensaje';
        return res.status(500).json({ success: false, message });
    }
};
