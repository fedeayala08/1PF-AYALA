export interface Course{
    id: number,
    title: string,
    description: string,
    startDate:Date,
    endDate: Date
}

export interface CourseCreation{
    title: string,
    description: string,
    startDate:Date,
    endDate: Date
}

export interface CoursetEdition{
    title?: string,
    description?: string,
    startDate?:Date,
    endDate?: Date
}