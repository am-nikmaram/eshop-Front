export class RegisterUserDTO{
    /**
     *
     */
    constructor(
        public userName:string,
        public fullName:string,
        public email:string,
        public password:string,
        public confirmPassword:string,
        public clientURI: string) {
        

    }
}