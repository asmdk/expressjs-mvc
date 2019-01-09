const mongoose = require('mongoose');
const globalType = 'global';

let variablesSchema = new mongoose.Schema({
    key: {
        type: String,
        required: [true, 'KEY is required'],
        unique: true
    },
    type: { type: String, default: globalType },
    value: mongoose.Schema.Types.Mixed
}, { collection: 'variables' });

variablesSchema.statics.byKey = function(key, cb) {
    return this.findOne({ key: key}).exec(cb);
};

variablesSchema.statics.all = function(cb) {
    return this.find().exec(cb);
};

// variablesSchema.post('find', function(result) {
//     console.log('ty[e');
//     if (result) {
//         var variables = {};
//         if (! Array.isArray(result)) {
//             result = [ result ];
//         }
//
//         result.forEach(function(item, key) {
//             variables[item.key] = item;
//         });
//         result = variables;
//     }
// });

module.exports = mongoose.model('Variables', variablesSchema);