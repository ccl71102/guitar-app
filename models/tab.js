const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tabSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    _tabId: {
        type: String,
        required: true
    },
    tabUrl: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["found", "new", "working", "done"],
        default: "found"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
});

module.exports = mongoose.model("Tab", tabSchema);