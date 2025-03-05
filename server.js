const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.DID_API_KEY;  // Get API key from environment variable

// Endpoint for generating lip-synced video
app.post('/talks', async (req, res) => {
    try {
        if (!req.body.text) {
            return res.status(400).json({ error: "Text input is required!" });
        }

        const response = await axios.post('https://api.d-id.com/talks', {
            source_url: "https://imgur.com/a/ai-generated-image-Fbqh9nv",  // ✅ Corrected Direct Image URL
            script: { type: "text", input: req.body.text }
        }, {
            headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" }
        });

        res.json({ video_url: response.data.result_url });
    } catch (error) {
        console.error("❌ Error:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || "Internal Server Error" });
    }
});

// ✅ Fix duplicate PORT issue
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`✅ Server running on port ${PORT}`));
