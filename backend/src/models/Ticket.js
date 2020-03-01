const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    date: {
       type: Date,
       default: Date.now,
    },
    status: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,  
    } 
});

module.exports = mongoose.model('Ticket', TicketSchema);