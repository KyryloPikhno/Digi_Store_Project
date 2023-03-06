const {Schema, model} = require('mongoose');
const { ObjectId } = Schema;


const orderSchema = new Schema({
    user: {type: ObjectId, ref: "User", require: true},
    deviceList: [{type: ObjectId, ref: 'DeviceList', require: true}],
    phone: {type: String, require: true},
    address: {type: String, require: true},
    city: {type: String, require: true},
    zip: {type: Number, require: true},
    country: {type: String, require: true},
    totalPrice: {type: Number, require: true},
    orderStatus: {type: Boolean, required: true, default: 'false'}
}, {
    timestamps: true
});

module.exports = model('Order', orderSchema);