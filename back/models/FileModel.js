const { model, Schema, ObjectId } = require("mongoose");

const FileSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    accessLink: { type: String },
    date: { type: Date, default: Date.now() },
    size: { type: Number, default: 0 },
    path: { type: String, default: "" },
    user: { type: ObjectId, ref: "User" },
    parent: { type: ObjectId, ref: "File" },
    children: [{ type: ObjectId, ref: "File" }],
});

module.exports = model("File", FileSchema);
