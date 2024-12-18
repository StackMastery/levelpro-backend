import express from 'express'
import axios from 'axios';

// Express Router
const mainRouter = express.Router()

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