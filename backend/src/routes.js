const { Router } = require('express');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const TicketController = require('./controllers/TicketController');
const SessionController = require('./controllers/SessionController');
const MessageController = require('./controllers/MessageController');


const routes = Router();

routes.post("/login", LoginController.store);
routes.post("/register", UserController.store);
routes.post("/chat/messages", MessageController.store);
routes.post("/chat/sessions", SessionController.store);

routes.get("/tickets", TicketController.index);
routes.post("/tickets", TicketController.store);

module.exports = routes;