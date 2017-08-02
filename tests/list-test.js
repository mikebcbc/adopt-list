const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

const should = chai.should();

const app = require('../app');

chai.use(chaiHttp);

function generateData() {
	return {
		name: faker.name.firstName(),
		description: faker.lorem.paragraph(),
		contactInfo: {
			phone: faker.phone.phoneNumber(),
			email: faker.internet.email()
		}
	}
}

describe('List Tests', function() {
	describe('POST endpoint', function() {
		it('should add a pet to the list', function() {
				const newPet = generateData();
				return chai.request(app)
					.post('/list')
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
						return Post.findById(res.body.id);
					})
					.then(function(pet) {
						pet.name.should.equal(newPet.name);
						pet.description.should.equal(newPet.description);
						pet.contactInfo.phone.should.equal(newPet.contactInfo.phone);
						pet.contactInfo.email.should.equal(newPet.contactInfo.email);
					});
			});
	});
});