const mongoose = require("mongoose")

const ProductCategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required:[true, "Please enter product name"]
        },

        image_thumbnail_url: {
            type: String,
            required: false
        },

        description: {
            type: String,
            required: false
        },

        status: {
            type: Boolean,
            required: true
        },
    },
    {
        timestamps: true
    }
)

ProductCategorySchema.method("toJSON", function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object
})

const ProductCategory = mongoose.model("Product-Category", ProductCategorySchema)

module.exports = ProductCategory