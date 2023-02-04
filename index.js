const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const app = express();
const port = process.env.port || 3000;

const configuration = new Configuration({
    apiKey: process.env.token,
});
const openai = new OpenAIApi(configuration);

app.get("/conversar", async (req, res) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `You: ${req.query.fala}`,
            temperature: 0.5,
            max_tokens: 300,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
            stop: ["You:"],
        });

        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );

        res.json({
            success: true,
            result: response.data.choices[0].text
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
