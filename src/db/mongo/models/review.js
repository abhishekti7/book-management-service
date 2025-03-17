const mongooose = require("mongoose");

const ReviewSchema = new mongooose.Schema({
    book_id: {
        type: Number,
        required: true,
    },
    user_id: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

// compound index to make sure that user can add only one review on a book
// ReviewSchema.index({ book_id: 1, user_id: 1 }, { unique: true });

module.exports = mongooose.model("Review", ReviewSchema);
