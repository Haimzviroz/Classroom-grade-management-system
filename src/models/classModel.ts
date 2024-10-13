import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClass extends Document {
  name: string;
  teacherId?: Types.ObjectId;
  studentsId: Types.ObjectId[];
}

const ClassSchema = new Schema<IClass>({
  name: {
    type: String,
    required: true,
    minlength: [5,"name must be at least 5 characters long"],
    max: [20,"name must be at most 20 characters long"],
  },
  teacherId: {
    type: Types.ObjectId,
    ref: "Teacher",
  },
  studentsId: [
    {
      type: Types.ObjectId,
      ref: "Student",
    },
  ],
});
export default mongoose.model<IClass>("Class", ClassSchema);
