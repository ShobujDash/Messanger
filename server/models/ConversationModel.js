const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    default:"",
  },
  imageUrl: {
    type: String,
    default:"",
  },
  vedioUrl: {
    type: String,
    default:"",
  },
  seen: {
    type: Boolean,
    default:"",
  }
}, {
  timestamps:true
})

const conversationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    reciver: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    message: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);


const MessageModel = mongoose.model('Message', messageSchema);
const ConversationModel = mongoose.model('Conversation', conversationSchema);

module.exports = {
  ConversationModel,
  MessageModel
};



