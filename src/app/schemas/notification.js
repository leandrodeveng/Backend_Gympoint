// Arquivo que define um schema no mongo, que é basicamente um model se comparado as sequelize.

import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Number,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model('Notification', NotificationSchema);
