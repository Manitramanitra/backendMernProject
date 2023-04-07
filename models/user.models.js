const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const userSchema = mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 53,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validator: [isEmail],
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6
        },
        likes: {
            type: [String]
        },
        bio: {
            type: String,
            max: 1024
        },
        followers: {
            type: [String],
        },
        following: {
            type: [String]
        },
        picture:{
            type:String,
            default:"./uploads/profil/random-user.jpg"
        }
    },
    {
        timestamps: true
    }

);

//play function before save into display: 'block'
// le mot clé pre('save') permet d'activer en premier le ligne de code contenant le pre
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;