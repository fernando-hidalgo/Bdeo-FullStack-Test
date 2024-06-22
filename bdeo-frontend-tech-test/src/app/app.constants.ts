/*ENVIRONMENTS*/
//DEV
export const HOST = 'http://localhost:3000'

//PRO
//export const HOST=''

export class URLParams {
    public static taskId = "taskId"
}

export class CRUDFormFields {
    public static taskTitle = "taskTitle"
    public static taskDescription = "taskDescription"
    public static taskStatus = "taskStatus"
}

export class Navigation {
    public static BASE ="/"
    public static EDIT = "edit"
    public static NEW = "new"
}

export enum TaskStatus {
    TODO = 'To Do',
    IN_PROGRESS = 'In Progress',
    DONE = 'Done',
}