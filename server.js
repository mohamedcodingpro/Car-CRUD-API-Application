import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

let carData = [];

// Fetch car data from external API
const fetchCarData = async () => {
  try {
    const response = await axios.get('https://bootcamp.projectcodex.co/cars.json');
    carData = response.data;
    console.log('Car data fetched successfully');
  } catch (error) {
    console.error('Error fetching car data:', error);
  }
};

// Fetch car data when the server starts
fetchCarData();

// GET all cars
app.get('/api/cars', (req, res) => {
  res.json(carData);
});

// POST a new car
app.post('/api/cars', (req, res) => {
  const newCar = req.body;
  carData.push(newCar);
  res.status(201).json(newCar);
});

// PUT (update) a car by registration number
app.put('/api/cars/:reg_number', (req, res) => {
  const reg_number = req.params.reg_number;
  const carIndex = carData.findIndex(car => car.reg_number === reg_number);
  if (carIndex !== -1) {
    carData[carIndex] = req.body;
    res.json(carData[carIndex]);
  } else {
    res.status(404).json({ message: 'Car not found' });
  }
});

// DELETE a car by registration number
app.delete('/api/cars/:reg_number', (req, res) => {
  const reg_number = req.params.reg_number;
  const carIndex = carData.findIndex(car => car.reg_number === reg_number);
  if (carIndex !== -1) {
    carData.splice(carIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Car not found' });
  }
});

// Custom function: Count Nissans from Malmesbury (CK)
app.get('/api/cars/nissans-from-ck', (req, res) => {
  const count = carData.filter(car => car.make === 'Nissan' && car.reg_number.startsWith('CK')).length;
  res.json({ count });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
