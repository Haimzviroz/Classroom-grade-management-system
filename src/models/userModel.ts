import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  profile: {
    bio?: string;
    socialLinks?: string[];
  };
  posts: Types.ObjectId[];
  comparePassword(userPassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
    minlength: [3, "username must be at least 3 characters long"],
    maxlength: [20, "username must be at most 20 characters long"],
    validate: {
      validator: function (v: string) {
        return validator.isAlphanumeric(v); // Use `validator.isAlphanumeric` as a custom validator
      },
      message: "username must be alphanumeric",
    },
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return validator.isEmail(v); // Use `validator.isEmail` as a custom validator
      },
      message: "Please enter a valid email address",
    },
  },
  profile: {
    bio: {
      type: String,
      minlength: [5, "bio must be at least 5 characters long"],
      maxlength: [50, "bio must be at most 50 characters long"],
    },
    socialLinks: {
      type: [String],
      validate: {
        validator: function (v: string[]) {
          return v.every(link => validator.isURL(link)); // Validates each URL in the array
        },
        message: "Please enter valid URLs",
      },
    },
  },
  posts: [
    {
      type: Types.ObjectId,
      ref: "Post",
    },
  ],
});

// Hashing password before saving the user
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Comparing passwords
UserSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
