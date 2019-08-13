const mongoose = require("mongoose");  
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({  
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

//save encrypted password

userSchema.pre("save", function(next) {
    if(!this.isModified("password"))
        return next();
    bcrypt.hash(this.password, 10, (err, hash) => {
        if(err)
            return next(err);
        this.password = hash;
        next();
    });
});

//check encrypted password
userSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err)
            return callback(err)
        callback(null, isMatch)
    });
}

//remove password before sending to front end
userSchema.methods.withoutPassword = function() {
    const user = this.toObject();
    delete user.password;
    return user;
}

module.exports = mongoose.model("User", userSchema);