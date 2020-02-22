const Ticket = require('../models/Ticket');
//const User = require('../models/User');

module.exports = {
    async index(request, response) {
        
        const { user_id } = request.query;

        const tickets = await Ticket.find({
            user_id: {
                $eq: user_id,
            },
        });

        return response.json({ tickets });
    },

    async store(request, response) {
        const { user_id, date, description } = request.body; //remover user_id e date dps
        
        //precisa filtrar user aqui?

        const ticket = await Ticket.create({
            user_id,
            date,
            status: 'Awaiting response',
            description
        })
    
        return response.json(ticket);
    },

};