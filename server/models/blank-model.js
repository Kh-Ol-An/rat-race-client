const { Schema, model } = require('mongoose');

const BlankSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    gender: { type: String, required: true },
    profession: { type: String, required: true },
    debt: { type: Number, default: 0 },
    rent: { type: Number, default: 0 },
    food: { type: Number, default: 0 },
    clothes: { type: Number, default: 0 },
    fare: { type: Number, default: 0 },
    phone: { type: Number, default: 0 },
    apartments: { type: Array, default: [] },
    cars: { type: Array, default: [] },
    cottages: { type: Array, default: [] },
    yachts: { type: Array, default: [] },
    planes: { type: Array, default: [] },
    whimsAndFancies: { type: Array, default: [] },
    marriage: { type: Boolean, default: false },
});

module.exports = model('Blank', BlankSchema);
