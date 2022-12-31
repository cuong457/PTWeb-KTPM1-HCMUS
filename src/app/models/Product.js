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

    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);
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
