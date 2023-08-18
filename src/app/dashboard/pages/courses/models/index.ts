
export interface Course{
    id: number,
    title: string,
    description: string,
    subjectId: number,
    startDate:Date,
    endDate: Date
}

export interface CourseCreation{
    title: string,
    description: string,
    subjectId: number,
    startDate:Date,
    endDate: Date
}

export interface CoursetEdition{
    title?: string,
    description?: string,
    subjectId?: number,
    startDate?:Date,
    endDate?: Date
}