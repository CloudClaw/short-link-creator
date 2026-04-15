import { Schema, model } from 'mongoose';

interface IShortner {
  originalLink: string;
  shortLink: string;
  //owner
  createdAt?: Date;
  updatedAt?: Date;
}

const shortnerSchema = new Schema<IShortner>(
  {
    originalLink: {
      type: String,
      required: [true, 'Original URL is required'],
    },
    shortLink: {
      type: String,
      required: [true, 'Short link is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Shortner = model<IShortner>('shortners', shortnerSchema);

export default Shortner;
