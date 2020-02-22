const { Router } = require('express');
const UserController = require('./controllers/UserController');
const TicketController = require('./controllers/TicketController');

const routes = Router();

//routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

//routes.get('/tickets', TicketController.index);
//routes.post('/tickets', TicketController.store);

module.exports = routes;