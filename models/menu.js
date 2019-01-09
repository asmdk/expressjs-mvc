const mongoose = require('mongoose');

let menuSchema = new mongoose.Schema({
    id: Number,
    menu_id: {
        type: String,
        required: [true, 'MENU_ID is required'],
        unique: true
    },
    link:  {
        type: String,
        required: [true, 'Item link is required']
    },
    title:{
        type: String,
        required: [true, 'Item title is required'],
        minlength: [3, 'tooShort']
    },
    order: Number,
    status: Number
}, { collection: 'menu' });

menuSchema.statics.byId = function(menu_id, cb) {
    return this.find({ menu_id: menu_id, status: 1 }).sort({order: 1}).exec(cb);
};

module.exports = mongoose.model('Menu', menuSchema);