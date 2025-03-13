const mongoose = require('mongoose');

const AuthorMetadataSchema = new mongoose.Schema({
    author_id: {
        type: Number,
        required: true,
        unique: true,
    },
    social_media: {
        twitter: String,
        facebook: String,
        website: String,
        instagram: String,
    },
    nationality: String,
    languages: [String],
    last_updated: {
        type: Date,
        default: Date.now,
    },
});

AuthorMetadataSchema.pre('save', function(next) {
    this.last_updated = Date.now();
    next();
});

module.exports = mongoose.model('AuthorMetadata', AuthorMetadataSchema);