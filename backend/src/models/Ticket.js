const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    user_id: String,
    date: Date,
    status: String,
    description: String,   
});

module.exports = mongoose.model('Ticket', TicketSchema);