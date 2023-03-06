const mongoose = require('mongoose');

const newSchema = mongoose.Schema({

    students: {
        type: [
            {
                name: { type: String },
                marks: { type: Number }
            }
        ]
    }
});

module.exports = mongoose.model('students', newSchema);
