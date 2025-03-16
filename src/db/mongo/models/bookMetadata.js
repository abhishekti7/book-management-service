const mongoose = require("mongoose");

const BookMetadataSchema = new mongoose.Schema({
    book_id: {
        type: Number,
        required: true,
        unique: true,
    },
    genres: {
        type: String,
    },
    tags: [
        {
            type: String,
        },
    ],
    average_rating: {
        type: Number,
        default: 0,
    },
    page_count: {
        type: Number,
    },
    last_updated: {
        type: Date,
        default: Date.now,
    },
});

BookMetadataSchema.pre("save", function (next) {
    this.last_updated = Date.now();
    next();
});

module.exports = mongoose.model("BookMetadata", BookMetadataSchema);
