// swagger.js (in root folder)
const swaggerAutogen = require('swagger-autogen')();

const doc = {
	info: {
		title: 'Users & Assignments API',
		description: 'API for managing users and assignments',
		version: '1.0.0',
	},
	host: 'localhost:3000', // change this when deployed
	schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; // your main routes entry file

swaggerAutogen(outputFile, endpointsFiles, doc);
