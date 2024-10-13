import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
interface IGrade extends Document {
  grade: number;
  comment: string;
}

export interface IStudent extends Document {
  name: string;
  password: string;
  email: string;
  grades: IGrade[];
  classId: Types.ObjectId[];
  comparePassword(userPassword: string): Promise<boolean>;
}
const GradeSchema = new Schema<IGrade>({
  grade: {
    type: Number,
    required: true,
    min: [0, "grade must be at least 0"],
    max: [100, "grade must be at most 100"],
  },
  comment: {
    type: String,
    required: true,
  },
})

const StudentSchema = new Schema<IStudent>({
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
  grades: [GradeSchema],
});

// Hashing password before saving the user
StudentSchema.pre<IStudent>("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Comparing passwords
StudentSchema.methods.comparePassword = async function (
  studentPassword: string
): Promise<boolean> {
  return await bcrypt.compare(studentPassword, this.password);
};

export default mongoose.model<IStudent>("Student", StudentSchema);
