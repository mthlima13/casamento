const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    guests: {
        type: Number,
        default: 0
    },
    companionNames: {
        type: String,
        trim: true
    },
    willAttendParty: {
        type: Boolean,
        default: true
    },
    willDrinkAlcohol: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Guest', GuestSchema);
