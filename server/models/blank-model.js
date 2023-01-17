const { Schema, model } = require('mongoose');

const BlankSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    gender: { type: String, default: '' },
    profession: { type: String, default: '' },
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
    children: {
        type: {
            count: { type: Number, default: 0 },
            expense: { type: Number, default: 0 },
        },
    },
    credits: { type: Array, default: [] },
    cash: { type: Number, default: 0 },
    salary: { type: Number, default: 0 },
    business: {
        type: {
            small: { type: Array, default: [] },
            middle: { type: Array, default: [] },
            big: { type: Array, default: [] },
            corrupt: { type: Array, default: [] },
            last: { type: Array, default: [] },
        },
    },
    shares: {
        type: {
            gc: { type: Array, default: [] },
            schp: { type: Array, default: [] },
            to: { type: Array, default: [] },
            cst: { type: Array, default: [] },
        },
    },
    assets: {
        type: {
            houses: { type: Array, default: [] },
            land: { type: Array, default: [] },
            corruptLand: { type: Array, default: [] },
        },
    },
    rich: { type: Boolean, default: false },
    win: { type: Boolean, default: false },
});

module.exports = model('Blank', BlankSchema);
