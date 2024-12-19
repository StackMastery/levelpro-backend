import express from 'express'
import axios from 'axios';
import {checkOtp, checkUser, checkUserName, createAccountVerification, userRegister} from '../controllers/register.controller.js'

// Express Router
const mainRouter = express.Router()

// Auth Router
mainRouter.post('/register', userRegister)
mainRouter.get('/check/email', checkUser)
mainRouter.get('/check/username', checkUserName)
mainRouter.put('/create/userotp', createAccountVerification)
mainRouter.get('/check/otp', checkOtp)



// Default get Route Liek 404
mainRouter.get('*', async (req, res) => {
    try {
        const response = await axios.get('https://media1.tenor.com/m/JIKo7oLJ8U8AAAAd/dipjol-bangla-cinema.gif', {
            responseType: 'stream',  
        });

        res.setHeader('Content-Type', 'image/gif');
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send('Error while fetching GIF');
    }
});

export default mainRouter