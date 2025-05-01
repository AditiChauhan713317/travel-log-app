const mongoose = require('mongoose');

const travelLogSchema = new mongoose.Schema( {
    title: {
        required: true,
        type: String
    },
    user_responses: {
        required: true,
        type: Object,
    },
    text: {
        required: true,
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
      },


})

const travelLogModel = mongoose.model('TravelLog', travelLogSchema);

module.exports = travelLogModel;
