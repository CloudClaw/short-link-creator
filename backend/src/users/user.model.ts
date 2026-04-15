import { Schema, Document, Model, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';
import NotAuthorizedError from '../errors/not-authorized-error';

interface IUser {
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  generateAcessToken: () => string;
}

interface IUserDoc extends Document, IUser {}

interface IUserModel extends Model<IUserDoc> {
  findUserByCredentials: (email: string, password: string) => Promise<IUserDoc | never>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email must be unique'],
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: 'Email is not valid',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      validate: {
        validator: (value: string) => {
          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
          return passwordRegex.test(value);
        },
        message: 'Password must contain at least one letter and one number',
      },
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password;

        return ret;
      },
    },
  },
);

userSchema.methods.generateAcessToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    JWT_SECRET as string,
    { expiresIn: '1h' },
  );
};

userSchema.statics.findUserByCredentials = async function (
  email: string,
  password: string
) {
  const user = await this.findOne({ email })
    .select('+password')
    .orFail(
      () => new NotAuthorizedError('User with provided credentials not found'),
    );

  return user;
};

const User = model<IUser, IUserModel>('users', userSchema);

export default User;
