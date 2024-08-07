import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

const should = chai.should();

chai.use(chaiHttp);

describe('Car CRUD API', () => {
  // Test GET all cars
  it('should GET all the cars', (done) => {
    chai.request(app)
      .get('/api/cars')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  // Test POST a new car
  it('should POST a new car', (done) => {
    const newCar = { color: 'red', make: 'Toyota', model: 'Corolla', reg_number: 'CA 12345' };
    chai.request(app)
      .post('/api/cars')
      .send(newCar)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('make').eql('Toyota');
        done();
      });
  });

  // Test PUT (update) a car
  it('should PUT (update) a car', (done) => {
    const reg_number = 'CA 12345';
    const updatedCar = { color: 'blue', make: 'Toyota', model: 'Corolla', reg_number: 'CA 12345' };
    chai.request(app)
      .put(`/api/cars/${reg_number}`)
      .send(updatedCar)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('color').eql('blue');
        done();
      });
  });

  // Test DELETE a car
  it('should DELETE a car', (done) => {
    const reg_number = 'CA 12345';
    chai.request(app)
      .delete(`/api/cars/${reg_number}`)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });

  // Test GET count of Nissans from Malmesbury (CK)
  it('should GET count of Nissans from Malmesbury (CK)', (done) => {
    chai.request(app)
      .get('/api/cars/nissans-from-ck')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('count');
        done();
      });
  });
});
