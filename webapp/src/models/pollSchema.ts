import mongoose, { Schema, Document, Model } from "mongoose";

interface IPollOption {
  text: string;
  votes: number;
}

interface IPoll extends Document {
  polltitle: string;
  pollImage?: string;
  options: IPollOption[];
  allowmultiple: boolean;
  requirelogin: boolean;
  owner?: mongoose.Types.ObjectId;
}

const pollOptionSchema = new Schema<IPollOption>(
  {
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
  },
  { _id: false } // prevents nested _id for each option
);

const pollSchema = new Schema<IPoll>(
  {
    polltitle: {
      type: String,
      required: true,
    },
    pollImage: {
      type: String,
    },
    options: {
      type: [pollOptionSchema],
      required: true,
      validate: {
        validator: function (arr: IPollOption[]) {
          return arr.length >= 2;
        },
        message: "A poll must have at least two options.",
      },
    },
    allowmultiple: {
      type: Boolean,
      required: true,
    },
    requirelogin: {
      type: Boolean,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Poll: Model<IPoll> = mongoose.models.Poll || mongoose.model<IPoll>("Poll", pollSchema);
export default Poll;
