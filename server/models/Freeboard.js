const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const freecommentSchema = require("./Freecomment");

const freeboardSchema = new Schema(
  {
    like: [{type: Schema.Types.ObjectId, ref: "User"}],
    like_count: {
      type: Number,
      default: 0,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: String,
    description: String,
    images: Array,
    freecomments: [
      {
        type: freecommentSchema,
        default: [],
      },
    ],
    isopen: {
      type: Boolean,
      default: true,
    },
  },
  {timestamps: true},
);

// freeboardSchema.plugin(findOrCreate);
module.exports = mongoose.model("Freeboard", freeboardSchema);
