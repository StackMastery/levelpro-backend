import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

// Configure Dot Env
dotenv.config()

// Node Mailer Credintial
const mailerConfig = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, 
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
})

const sendMail = async ({to, subject, text, html}) => {
    try{
        const info = await mailerConfig.sendMail({
            from: `"Level Pro ✨" <${process.env.EMAIL_USERNAME}>`, // sender address
            to: `${to || process.env.EMAIL_USERNAME}`, 
            subject: subject || 'Test', 
            text: text || '',
            html: html || '',
        });
    }
    catch(err){
        console.log(err)
    }
}

export default sendMail