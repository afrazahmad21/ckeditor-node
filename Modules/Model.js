const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    data: String,
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('editor', UserSchema);
