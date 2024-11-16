import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";
const API_KEY = "08c964e1-86f3-4c03-a73a-75bf1dab2012";
const BearerToken = "db1b0dd4-1ca6-4092-9a8e-71c345d2a2e7";
const userName = "PavaniGudupu";
const passWord = "Pegasus@12523";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {content: "HI THERE!!",});
});

app.post("/random", async (req, res) => {
    try {

        const response = await axios.get(API_URL + "/random")
        const request = response.data;
        console.log(request);
        res.render("index.ejs", {content: JSON.stringify(request)});
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});


app.post("/allbasicAuth", async (req, res) => {
    const config = {
        auth: {
            username: userName,
            password: passWord,
        },
        params: {
            page: 1,
        }
    }
    try {

        const response = await axios.get(API_URL + "/all", config);
        const request = response.data;
        console.log(request);
        res.render("index.ejs", {content: JSON.stringify(request)});
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});


app.post("/filter", async (req, res) => {
    const config = {
        params: {
            score: req.body.score,
            apiKey: API_KEY,
        }
    }
    try {
        const response = await axios.get(API_URL + "/filter", config);
        const request = response.data;
        console.log(request);
        res.render("index.ejs", {content: JSON.stringify(request)});
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

app.post("/SecretsID", async (req, res) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${BearerToken}`, // Ensure BearerToken is defined and valid
            },
        };
        const response = await axios.get(API_URL + `/secrets/${req.body.id}`, config); // Use template literals for cleaner code
        const request = response.data; 
        console.log("Fetched Data:", request); 
        res.render("index.ejs", { content: JSON.stringify(request, null, 2) }); // Pretty-print JSON for better readability
    } catch (error) {
        console.error("Error fetching user secrets:", error.message);  
        // Log detailed error info (optional)
        if (error.response) {
            console.error("Response Data:", error.response.data);
            console.error("Status Code:", error.response.status);
        }
        res.status(500).send("Failed to fetch user secrets.");
    }
});


//404
app.post("/userSecrets", async (req, res) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${BearerToken}`,
            }
        }
        const response = await axios.get(`${API_URL}/user-secrets`, config);
        const request = response.data;
        console.log(request);
        res.render("index.ejs", {content: JSON.stringify(request)});
    } catch(error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});


app.post("/postSecrets", async(req, res) => {
    try{
        const config = {
            headers: {
                Authorization: `Bearer ${BearerToken}`,
            },
        }
    const body = {
        secret: req.body.yourSecret,
        score: req.body.yourScore,
    }
    const response = await axios.post(API_URL + "/secrets", body, config);
    const request = response.data;
    console.log(request);
    res.render("index.ejs", {content: JSON.stringify(request)});
    } catch(error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});



app.post("/putSecret", async (req, res) => {
    try {
        const id = req.body.updateID; // Get the ID from the form
        const body = {
            secret: req.body.yourSecret, // Updated secret content
            score: req.body.yourScore,  // Updated score
        };

        const config = {
            headers: {
                Authorization: `Bearer ${BearerToken}`, // Bearer token for authentication
            },
        };

        // Send PUT request to the API
        const response = await axios.put(`${API_URL}/secrets/${id}`, body, config);

        // Log and render the updated secret
        console.log("Updated Secret:", response.data);
        res.render("index.ejs", { content: JSON.stringify(response.data, null, 2) });
    } catch (error) {
        console.error("Error updating the secret:", error.message);

        // Log detailed error information
        if (error.response) {
            console.error("Response Data:", error.response.data);
            console.error("Status Code:", error.response.status);
        }

        res.status(500).send("Failed to update the secret.");
    }
});





app.post("/patchSecret", async (req, res) => {
    try {
        const id = req.body.patchID; // Get the ID from the form
        const body = {
            secret: req.body.yourSecret, // Updated secret content
            score: req.body.yourScore,  // Updated score
        };

        const config = {
            headers: {
                Authorization: `Bearer ${BearerToken}`, // Bearer token for authentication
            },
        };

        // Send PUT request to the API
        const response = await axios.patch(`${API_URL}/secrets/${id}`, body, config);

        // Log and render the updated secret
        console.log("Updated Secret:", response.data);
        res.render("index.ejs", { content: JSON.stringify(response.data, null, 2) });
    } catch (error) {
        console.error("Error updating the secret:", error.message);

        // Log detailed error information
        if (error.response) {
            console.error("Response Data:", error.response.data);
            console.error("Status Code:", error.response.status);
        }

        res.status(500).send("Failed to update the secret.");
    }
});


app.post("/deleteID", async(req, res) => {
try{
    const config = {
        headers: {
            Authorization: `Bearer ${BearerToken}`,
        }
    }
    const response = await axios.delete(API_URL+`/secrets/${req.body.id}`, config);
    const request = response.data;
    console.log(request);
    res.render("index.ejs", {content: request});
    
}catch(error) {
    console.log(error.message);
    res.status(500).send(error.message);
}
});


app.listen(3000, function(req, res) {
    console.log("Server running on port 3000..");
});