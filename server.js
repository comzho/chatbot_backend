const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.DID_API_KEY;  // Get API key from environment variable

app.post('/talks', async (req, res) => {
    try {
        const response = await axios.post('https://api.d-id.com/talks', {
            source_url: "https://imgur.com/a/ai-generated-image-Fbqh9nv",  // Avatar Image URL
            script: { type: "text", input: req.body.text }
        }, {
            headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" }
        });

        res.json({ video_url: response.data.result_url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
