const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const striptags = require('striptags');
const slugify = require('./../services/slugify');

let articleSchema = new mongoose.Schema({
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
        keywords: String
    }
}, { collection: 'articles'});
articleSchema.plugin(mongoosePaginate);

articleSchema.pre('save', function (next) {
    this.slug = slugify.slugify(this.title);
    next();
});

articleSchema.post('find', function processResult(result) {
    if (result) {
        if (! Array.isArray(result)) {
            result = [ result ];
        }
        result.forEach(function(article) {
            if (!article.fields.body_summary) {
                article.fields.body_summary = striptags(article.fields.body_value).substr(0, 255) + '...';
            }
        });
    }
});

module.exports = mongoose.model('Articles', articleSchema);