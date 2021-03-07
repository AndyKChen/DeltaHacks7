const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },
    name: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

// userSchema.pre('save', function () {
//     if (this.isModified('password')) {
//       this.password = hashSync(this.password, 10);
//     }
//   });

userSchema.methods.comparePasswords = function (password) {
    return compareSync(password, this.password);
  };

const User = mongoose.model('User', userSchema);

module.exports = User;