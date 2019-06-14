const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

let urlProto = new Schema({
    url: { type: String, required: true, unique: true },
    num: { type: Number }
})

let URLModel = mongoose.model('url', urlProto);


const createAndSaveUrl = async (url) => {
    try {
        let num = await URLModel.count() + 1;
        let myUrl = new URLModel({ 'url': url, 'num': num });
        return myUrl.save();
    } catch (err) {
        console.log("err save", err);
        return;
    }
}

const getUrlByNum = (num, done) => {
    return URLModel.find({ 'num': num }, done)
}

const getUrlByUrl = (url, done) => {
    return URLModel.find({ 'url': url });
}

exports.URLModel = URLModel;
exports.getUrlByNum = getUrlByNum;
exports.createAndSaveUrl = createAndSaveUrl;
exports.getUrlByUrl = getUrlByUrl;