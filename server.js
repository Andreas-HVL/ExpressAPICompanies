const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const AZURE_API_URL = process.env.AZURE_PROD_API_URL; // actual url when server is up.
const LOCAL_API_URL = process.env.LOCALHOST_API_URL; // for testing minimal API in localhost when server is off.


app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";



app.get("/company", async (req, res) => {
    try {
        const response = await axios.get(`${LOCAL_API_URL}/company`);  // Call the .NET API
        res.status(200).json(response.data);  // Return the data from .NET API to the client
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});

app.get('/company/:rank', async (req, res) => {
    try{
        const {rank} = req.params;

        const response = await axios.get(`${LOCAL_API_URL}/company/${rank}`)
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});


app.put('/company/:id', async (req, res) => {
    const {id} = req.params;
    let updatedData = req.body;

    updatedData = Object.fromEntries(
        Object.entries(updatedData).filter(([_, value]) => value !== null && value !== '' && value !== undefined)
    );
    
    

    try{

        const response = await axios.put(`${LOCAL_API_URL}/company/${id}`, updatedData)
        
        res.status(200).json({
            
            message: `Company with ID ${id} successfully updated.`,
            data: response.data || null 
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});

app.delete('/company/:id', async (req, res) => {
    try{
        const {id} = req.params;
        
        const response = await axios.delete(`${LOCAL_API_URL}/company/${id}`)
        res.status(200).json({
            message: `Company with ID ${id} successfully deleted.`,
            data: response.data || null 
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});

app.post('/company', async (req,res)=>{
    let newCompany = req.body;
    console.log("Data received from frontend:", newCompany);
    try{
        const response = await axios.post(`${LOCAL_API_URL}/company`, newCompany)
        res.status(200).json({
            message: `Company created`,
            data: response.data
        })
    }catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Express API running on http://localhost:${PORT}`);
});

