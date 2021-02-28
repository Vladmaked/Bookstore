const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const paginate = require('mongoose-paginate');

const orderSchema = new Schema(
  {
    number: Number,
    status: String,
    customerId: mongoose.Schema.ObjectId,
    orderItems: [
      {
        quantity: Number,
        subtotal: Number,
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
      },
    ],
    createdDate: Date,
    deliveryMethod: String,
    deliveryCity: String,
    deliveryStreet: String,
    deliveryPostalCode: String,
    deliveryBuildingNumber: String,
    deliveryPostOffice: String,
    customerFirstName: String,
    customerLastName: String,
    customerPatronymicName: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }

  // totalPrice: virtual
);

orderSchema.pre(/^find/, function (next) {
  this.populate('orderItems.product', 'title price');
  next();
});

orderSchema.virtual('totalPrice').get(function () {
  const total = this.orderItems.reduce((t, oi) => {
    oi.subtotal = oi.product.price * oi.quantity;
    return (t += oi.subtotal);
  }, 0);

  return total;
});

orderSchema.plugin(paginate);

module.exports = mongoose.model('Order', orderSchema);
