import { CommonCode } from '../enums/code.enum'
import { CommonMessage } from './../enums/message.enum'
export class ErrorException {
    public code = 500
    public data: any
    public msg: string | CommonMessage | any = CommonMessage.UNKNOWN
    public subCode = 500

    constructor(data?: any, code?: number, msg?: string) {
        this.code = code || CommonCode.UNKNOWN
        this.data = data || CommonMessage.UNKNOWN
        this.msg = msg || CommonMessage.ERROR
        if (this.code) {
            const code = this.code.toString()
            const subCode = code.substr(0, 3)
            this.subCode = parseInt(subCode)
        }
    }
}

export class ResponseData {
    public code = 200
    public msg = CommonMessage.SUCCESS
    public data?: any
    public pi = 0
    public ps = 0
    public total = 0
    public subCode = 200
    constructor(
        data?: any,
        pi?: number,
        ps?: number,
        total?: number,
        msg?: string | CommonMessage | any,
        code?: number
    ) {
        this.data = data
        this.code = code || 200
        this.msg = msg || CommonMessage.SUCCESS
        this.pi = pi || 0
        this.ps = ps || 0
        this.total = total || 0
        this.data = data
        if (this.code) {
            const code = this.code.toString()
            const subCode = code.substr(0, 3)
            this.subCode = parseInt(subCode)
        }
    }
}

export class EgoResponse<T> {
    status: number
    error_code: number
    message: string
    data: T;
    [key: string]: any

    constructor(status: number, error_code: number, message: string, data: T) {
        this.status = status
        this.error_code = error_code
        this.message = message
        this.data = data
    }
}
