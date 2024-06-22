import { TaskStatus } from "../app.constants"

export class Task {
    _id?: string
    title?: string
    description?: string
    status?: TaskStatus

    constructor(id?: string, title?: string, description?: string, status?: TaskStatus) {
        this._id = id
        this.title = title
        this.description = description
        this.status = status
    }
}