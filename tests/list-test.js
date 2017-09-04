const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const btoa = require('btoa');
const mongoose = require('mongoose');

const {Pet, User} = require('../models');

const should = chai.should();

const app = require('../bin/www');

chai.use(chaiHttp);

function generateData() {
	return {
		petId: faker.random.number(),
		name: faker.name.firstName(),
		description: faker.lorem.paragraph(),
		image: faker.image.imageUrl(),
		contactInfo: {
			phone: faker.phone.phoneNumber(),
			email: faker.internet.email()
		}
	}
}

function destroyDb() {
	return mongoose.connection.dropDatabase();
}

describe('List Tests', function() {
	beforeEach(function(done) {
		User.hashPassword('tester')
		.then((pass) => {
			return User
				.create({
					username: 'tester@testing.com',
					password: pass,
					zip: '12345'
				})
		})
		.then(() => {
			done();
		})
	})

	afterEach(function() {
		return destroyDb();
	});

	after(function() {
		return mongoose.connection.close();
	})

	describe('POST endpoint', function() {
		it('should add a pet to the list', function() {
				const newPet = generateData();
				return chai.request(app)
					.post('/auth/login')
					.set("Authorization", 'Basic dGVzdGVyQHRlc3RpbmcuY29tOnRlc3Rlcg==')
					.then((res) => {
						return chai.request(app)
						.post('/list')
						.set('Authorization', `Bearer ${res.body.authToken}`)
						.send(newPet)
						.then(function(res) {
							res.should.have.status(201);
							res.should.be.json;
							res.should.be.a('object');
							res.body.should.include.keys('name', 'description', 'contactInfo');
							res.body.name.should.equal(newPet.name);
							res.body.description.should.equal(newPet.description);
							res.body.contactInfo.phone.should.equal(newPet.contactInfo.phone);
							res.body.contactInfo.email.should.equal(newPet.contactInfo.email);
							return Pet.findById(res.body._id);
						})
						.then(function(pet) {
							pet.name.should.equal(newPet.name);
							pet.description.should.equal(newPet.description);
							pet.contactInfo.phone.should.equal(newPet.contactInfo.phone);
							pet.contactInfo.email.should.equal(newPet.contactInfo.email);
						});
					})
			});
	});
});