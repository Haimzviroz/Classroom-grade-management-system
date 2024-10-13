import Teacher, { ITeacher } from "../models/teacherModel";
import Class, { IClass } from "../models/classModel";
import { Types } from "mongoose";
import { log } from "console";
import Student from "../models/studentModel";

export const createTeacher = async (body: any) : Promise<Types.ObjectId> => {
  const newTeacher = new Teacher({
    name: body.name,
    email: body.email,
    password: body.password,
  });
  const newClass = new Class({
    name: body.className,
    teacherId: newTeacher._id,
    studentsId: [],
  });
  await newClass.save();
  newTeacher.classId = newClass._id as Types.ObjectId;
  await newTeacher.save();
  return newTeacher.classId;
};
export const createStudent = async (body: any): Promise<Types.ObjectId|unknown> => {
  const newStudent = new Student({
    name: body.name,
    password: body.password,
    email: body.email,
    classId: body.classId,
  });
  await Class.findByIdAndUpdate(body.classId, {
    $push: { studentsId: newStudent._id },
  })
  await newStudent.save();
  return newStudent._id;
}