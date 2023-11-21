const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;


async function getApiResponse(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


let episodes = [];

app.get('/', (req, res) => {
    let episodeName = `My Little Pony: Episode ${Math.floor(Math.random() * 100) + 1}`;
    episodes.push(episodeName);

    res.json({ episodeName: episodeName });
});

app.get('/all', (req, res) => {
  res.json(episodes);
});
app.get('/get', async (req, res) => {
    try {
        const response = await getApiResponse("https://ponyapi.net/v1/character/1");
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching data from the API');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
