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
        const { user_id, subject, description } = request.body;

        const ticket = await Ticket.create({
            user_id: user_id,
            status: 'Awaiting response',
            subject: subject,   
            description: description,
        })
    
        return response.json(ticket);
    },

};