import { Schema, Document, Model, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import { compare, genSalt, hash } from 'bcryptjs';
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
  findUserByCredentials: (
    email: string,
    password: string,
  ) => Promise<IUserDoc | never>;
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

userSchema.pre('save', async function (next) {
  try {
    // Если поле создано или модифицировано
    if (this.isModified('password')) {
      const salt = await genSalt(10);
      this.password = await hash(this.password, salt);
    }
  } catch (error) {
    next(error as Error);
  }
});

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
  password: string,
) {
  const user = await this.findOne({ email })
    .select('+password')
    .orFail(
      () => new NotAuthorizedError('User with provided credentials not found'),
    );

  const isCorrectPassword = await compare(password, user.password);

  if (isCorrectPassword) {
    return user;
  }

  throw new NotAuthorizedError('Invalid credentials');
};

const User = model<IUser, IUserModel>('users', userSchema);

export default User;
