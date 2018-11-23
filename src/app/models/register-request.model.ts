export class RegisterRequest{
    constructor(
        public firstName: string,
        public lastName: string,
        public password: string,
        public email: string,
        public phNo: string
    ){}
}