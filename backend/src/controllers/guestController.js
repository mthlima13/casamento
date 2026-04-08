const Guest = require('../models/Guest');

exports.confirmPresence = async (req, res) => {
    try {
        const { name, guests, companionNames, willAttendParty, willDrinkAlcohol } = req.body;

        const newGuest = new Guest({
            name,
            guests,
            companionNames,
            willAttendParty,
            willDrinkAlcohol
        });

        await newGuest.save();
        res.status(201).json({ message: 'Presença confirmada com sucesso!', guest: newGuest });
    } catch (error) {
        console.error('Erro ao confirmar presença:', error);
        res.status(500).json({ message: 'Erro ao processar a confirmação.' });
    }
};

exports.getAllGuests = async (req, res) => {
    try {
        const guests = await Guest.find().sort({ createdAt: -1 });
        res.status(200).json(guests);
    } catch (error) {
        console.error('Erro ao buscar convidados:', error);
        res.status(500).json({ message: 'Erro ao buscar a lista de convidados.' });
    }
};
