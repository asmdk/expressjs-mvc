const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const striptags = require('striptags');
const slugify = require('./../services/slugify');

let newsSchema = new mongoose.Schema({
    nid: Number,
    type: String,
    title:{
        type: String,
        required: [true, 'titleRequired'],
        minlength: [6, 'tooShort'],
        unique: true
    },
    slug: String,
    status: Number,
    created: Number,
    changed: Number,
    comment: Number,
    sticky: Number,
    fields: {
        body_value: String,
        body_summary: String,
        body_format: String,
        meta_keywords: String,
        meta_description: String
    }
}, { collection: 'news'});
newsSchema.plugin(mongoosePaginate);

newsSchema.pre('save', function (next) {
    this.slug = slugify.slugify(this.title);
    next();
});

newsSchema.post('find', function processResult(result) {
    if (result) {
        if (! Array.isArray(result)) {
            result = [ result ];
        }
        result.forEach(function(news) {
            if (!news.fields.body_summary) {
                news.fields.body_summary = striptags(news.fields.body_value).substr(0, 255) + '...';
            }
        });
    }
});

module.exports = mongoose.model('News', newsSchema);