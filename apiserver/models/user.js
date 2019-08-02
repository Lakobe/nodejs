const db = require("../config/db");

const schema = new db.Schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'http://localhost:3000/hero.jpg'
    }
});
module.exports = db.model("user",schema);