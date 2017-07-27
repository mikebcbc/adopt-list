const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

const app = require('../app');

chai.use(chaiHttp);

describe('Connection Tests', function() {
	it('should return status 200 on root', function() {
		return chai.request(app)
			.get('/')
			.then(function(res) {
				res.should.have.status(200);
			});
	});
});