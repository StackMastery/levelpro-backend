import mongoose from 'mongoose';

const UserVerifySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

UserVerifySchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const UserVerifyModel = mongoose.model('OtpRequest', UserVerifySchema);

export { UserVerifyModel };
