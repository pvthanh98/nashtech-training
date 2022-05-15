import { User } from '../databases/models/user.model';
import { ErrorTemplate } from '../template/error.template';
import ServiceResponse from '../types/service-response';
import SignIn from '../types/signin';
import UserRegister from '../types/user-register';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class AuthService {
    constructor(){}
    userRegister = async (userData: UserRegister): Promise<ServiceResponse> => {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(userData.password, salt);
        /** Check if email exists */
        const isExist = await User.exists({
            email: userData.email
        })
        
        if (isExist) return {
            err: ErrorTemplate.Auth.EMAIL_EXISTED,
            data: null
        }

        const user = new User({
            ...userData,
            password:hash
        })
        await user.save();

        return {
            data:{
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                birthday: user.birthday,
                email: user.email,
                address: user.address
            },
            err: null
        }
    }

    userSignIn = async (data: SignIn): Promise<ServiceResponse> => {
        const user = await User.findOne({email:data.email}).select('email password');
        if (user) {
            const isPasswordCorrect = await bcrypt.compareSync(data.password, user.password);
            if (isPasswordCorrect) return {
                data: {
                    accessToken: await jwt.sign({sub: user._id, email: user.email}, process.env.JWT_SECRET),
                },
                err:null
            }
        }
        
        return {
            data:null,
            err: ErrorTemplate.Auth.EMAIL_PASS_NOT_CORECT
        }
        
    }
}

export default AuthService