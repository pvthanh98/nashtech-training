interface UserRegister {
    firstName: string,
    lastName: string,
    birthday: Date,
    password: string,
    email: string,
    address?: {
        city?: string,
        country?: string,
        postcode?:string,
        state?:string,
    }
}

export default UserRegister;