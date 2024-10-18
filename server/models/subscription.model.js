let mongoose = require('mongoose')
let subscription = mongoose.Schema({

    // sellerId: { type: String, },
    // newsLetterId: String,
    // type: { type: String, enum: ['monthly', 'quarterly', 'yearly'] },
    // price: { type: Number, default: 0 },
    email:String,

}, { timestamps: true });
module.exports = mongoose.model('Subscription', subscription)