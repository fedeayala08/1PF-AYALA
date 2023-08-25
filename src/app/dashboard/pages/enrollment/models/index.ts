import { Course } from "../../courses/models";
import { Student } from "../../students/models";

export interface Enrollment {
    id: number;
    studentId: number;
    courseId: number;
  }
  
  export interface EnrollmentWithStudentAndCourse extends Enrollment {
    student : Student;
    course : Course;
  }
  
  export interface CreateEnrollmentPayload {
    studentId: number | null;
    courseId: number | null;
  }
  