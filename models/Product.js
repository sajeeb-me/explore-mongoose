const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema design
const productSchema = Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this product."],
        trim: true,
        unique: [true, "Name must be unique."],
        minLength: [3, "Name must be at lease 3 characters."],
        maxLength: [50, "Name is too large."]
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "price can't be negative"],
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs"],
            message: "Unit value can't be {VALUE}, must be kg/litre/pcs"
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity can't be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        message: "Quantity must be integer"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "status can't be {VALUE}"
        }
    },
    // createdAt: {
    //     type: Data,
    //     default: Date.now,
    // },
    // updatedAt: {
    //     type: Data,
    //     default: Date.now,
    // },
    // supplier: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Supplier'
    // },
    // categories: [{
    //     name: {
    //         type: String,
    //         required: true,
    //     },
    //     _id: Schema.Types.ObjectId,
    // }]
}, {
    timestamps: true,
})


// mongoose middleware for saving data: pre/post
productSchema.pre('save', function (next) {
    console.log('before saving data');
    if (this.quantity === 0) {
        this.status = 'out-of-stock'
    }
    next();
})
// productSchema.post('save', function (doc, next) {
//     // console.log(doc);
//     console.log('after saving data');
//     next();
// })


// Instance Methods
productSchema.methods.logger = function () {
    console.log(`Data saved for ${this.name}`);
}

// SCHEMA > MODEL > QUERY

const Product = mongoose.model('Product', productSchema);

module.exports = Product;