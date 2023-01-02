const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Array, required: true },
    manufacturer: { type: String },
    stock: { type: Number },
    suspended: { type: Boolean },
    photo: { type: Array, required: true },
    foodThumbnail: { type: String },
    description: { type: String },
    total_purchase: { type: Number, default: 0 },
    slug: { type: String, slug: "name", unique: true },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be greater than or equal 1"],
      max: [5, "Rating must be less than or equal 5"],
      set: function (val) {
        return Math.round(val * 10) / 10;
      },
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
});

//Custom query helper
ProductSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty("_sort")) {
    const isValidType = ["asc", "desc"].includes(req.query.type);
    return this.sort({
      [req.query.column]: isValidType ? req.query.type : "desc",
    });
  }
  return this;
};

ProductSchema.statics.getTotalSpent = async function (productId) {
  const orders = await this.find({ userId });

  const totalSpent = orders.reduce((accum, order) => {
    return accum + order.subTotal;
  });

  return totalSpent;
};

// Add plugin
mongoose.plugin(slug);

module.exports = mongoose.model("Product", ProductSchema);
