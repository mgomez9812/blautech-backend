const mongoose = require('mongoose')
const { Schema } = mongoose;

const UsersSchema = new Schema({
    name: String,
    lastname: String,
    age: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

UsersSchema.pre('save', function() {
    if (this.isModified) {
        this.updatedAt = Date.now();
    }
});

module.exports = mongoose.model('Users', UsersSchema)