const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.MLAB_URI, { useNewUrlParser: true });

let exoProto = new Schema({
    description: String,
    duration: Number,
    date: Date,
    author: { type: Schema.Types.ObjectId, ref: 'users' }
});

let Exo = mongoose.model('exercises', exoProto);

let userProto = new Schema({
    username: { type: String, required: true, unique: true },
})

let User = mongoose.model('users', userProto);

exports.Exo = Exo;
exports.User = User;