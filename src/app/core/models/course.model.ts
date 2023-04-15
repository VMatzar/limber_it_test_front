export interface Course {
    course_id: string;
    name: string;
    credits: Date;
    teacher: string;
    assigned?: boolean;
}