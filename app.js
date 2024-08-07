document.addEventListener('alpine:init', () => {
    Alpine.data('carApp', () => ({
        cars: [],
        newCar: { color: '', make: '', model: '', reg_number: '' },
        fetchCars() {
            axios.get('/api/cars')
                .then(response => {
                    this.cars = response.data;
                })
                .catch(error => {
                    console.error('Error fetching cars:', error);
                });
        },
        addCar() {
            axios.post('/api/cars', this.newCar)
                .then(response => {
                    this.cars.push(response.data);
                    this.newCar = { color: '', make: '', model: '', reg_number: '' };
                })
                .catch(error => {
                    console.error('Error adding car:', error);
                });
        },
        editCar(car) {
            axios.put(`/api/cars/${car.reg_number}`, car)
                .then(response => {
                    const index = this.cars.findIndex(c => c.reg_number === car.reg_number);
                    this.cars[index] = response.data;
                })
                .catch(error => {
                    console.error('Error editing car:', error);
                });
        },
        deleteCar(reg_number) {
            axios.delete(`/api/cars/${reg_number}`)
                .then(() => {
                    this.cars = this.cars.filter(car => car.reg_number !== reg_number);
                })
                .catch(error => {
                    console.error('Error deleting car:', error);
                });
        },
        init() {
            this.fetchCars();
        }
    }));
});
