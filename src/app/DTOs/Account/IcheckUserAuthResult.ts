
export interface IcheckUserAuthResult {
    //[x: string]: any
    isSuccess: boolean;
    message: string;
    statusCode: string;
    data: {
        userName: string;
        fullName: string;
        email: string;
    };
}
