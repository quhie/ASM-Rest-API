const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: Number,
        default: 1
    },
    avatar: {
        type: String,
        default: ''
    },
    carts: {
        type: Array,
        default: []
    },
    available: {
        type: Boolean,
        default: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});

User.pre('save', function(next) {
    if (!this.isNew) {
        this.updateAt = Date.now();
    }
    next();
});

module.exports = mongoose.model('User', User);
