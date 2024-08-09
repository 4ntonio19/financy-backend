export class HandleError {
    public statusCode: number
    public message: string 
    constructor(statusCode: number, message: string) {
        this.statusCode = statusCode
        this.message = message
    }
}