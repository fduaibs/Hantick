const { Router } = require('express');
const LoginController = require('../../controllers/LoginController');

const routes = Router();

routes.post("/login", LoginController.store);

module.exports = routes;