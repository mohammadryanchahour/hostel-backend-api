const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    permission_ids: [{ type: String, required: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
