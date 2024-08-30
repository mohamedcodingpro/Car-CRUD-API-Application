import express from 'express';
import cors from 'cors';
import axios from 'axios';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let cars = [];

app.get('/cars', async (req, res) => {
    try {
        const response = await axios.get('https://bootcamp.projectcodex.co/cars.json');
        cars = response.data;
        res.json(cars);
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Error' });
    }
});

app.post('/cars', (req, res) => {
    const newCar = req.body;
    cars.push(newCar);
    res.status(201).json(newCar);
});


app.put('/cars/:reg_number', (req, res) => {
    const regNumber = req.params.reg_number;
    const updatedCar = req.body;
    cars = cars.map(car => car.reg_number === regNumber ? updatedCar : car);
    res.json(updatedCar);
});

app.delete('/cars/:reg_number', (req, res) => {
    const regNumber = req.params.reg_number;
    cars = cars.filter(car => car.reg_number !== regNumber);
    res.status(204).send();
});

app.get('/mostPopularCar', (req, res) => {
    const makeCounts = cars.reduce((acc, car) => {
        acc[car.make] = (acc[car.make] || 0) + 1;
        return acc;
    }, {});

    const mostPopularMake = Object.keys(makeCounts).reduce((a, b) => makeCounts[a] > makeCounts[b] ? a : b);
    res.json({ mostPopularMake });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});