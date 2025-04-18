import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  //  url: { type: String, default: "" },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    default: null,
  },
  children: [{ type: mongoose.Schema.Types.ObjectId }],
});
// console.log("hitmenuitem");

export const menuItemModel = mongoose.model("MenuItem", menuItemSchema);
