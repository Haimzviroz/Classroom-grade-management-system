import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

export interface ITeacher extends Document {
  name: string;
  email: string;
  password: string;
  class: Types.ObjectId[];
  comparePassword(userPassword: string): Promise<boolean>;
}

const StudentSchema = new Schema<ITeacher>({
  name: {
    type: String,
    required: [true, "name is required"],
    unique: true,
    minlength: [3, "name must be at least 3 characters long"],
    maxlength: [20, "name must be at most 20 characters long"],
    validate: {
      validator: function (v: string) {
        return validator.isAlphanumeric(v); // Use `validator.isAlphanumeric` as a custom validator
      },
      message: "name must be alphanumeric",
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
});

// Hashing password before saving the user
StudentSchema.pre<ITeacher>("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
StudentSchema.methods.comparePassword = async function (
  TeacherPassword: string
): Promise<boolean> {
  return await bcrypt.compare(TeacherPassword, this.password);
};

export default mongoose.model<ITeacher>("Teacher", StudentSchema);
