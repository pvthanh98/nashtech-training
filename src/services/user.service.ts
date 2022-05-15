import { paginateProcess, paginateResponse } from "../configs/pagination.config";
import { User } from "../databases/models/user.model"
import { ErrorTemplate } from "../template/error.template";
import ServiceResponse from "../types/service-response"

class UserService {
    public getUsers = async (query: any, userId:any): Promise<ServiceResponse> => {
        console.log(userId)
        const { page, limit, skip } = paginateProcess(query);

        let filterParas : any = {};
        if (query.search){
            filterParas = {
                $or: [
                    {
                        firstName: {
                            $regex: query.search,
                            $options: "i"
                        }
                    },
                    {
                        lastName: {
                            $regex: query.search,
                            $options: "i"
                        }
                    }
                ]
            }
        }

        if (query.isAdmin){
            filterParas.isAdmin = query.isAdmin == 'true';
        }

        const users = await User
            .find({
                ...filterParas,
                _id: {
                    $ne: userId
                }
            })
            .limit(limit)
            .skip(skip)
            .exec()
        ;
        return {
            data: paginateResponse(page, users),
            err: null
        }
    }

    blockUnblockUser = async (userId: string): Promise<ServiceResponse> => {
        const user = await User.findById(userId);
        if (!user) return {
            err: ErrorTemplate.User.NOT_FOUND,
            data: null
        }

        user.isActive = !user.isActive;
        await user.save();

        return {
            data: {
                isActive: user.isActive
            },
            err: null
        }

    }
}

export default UserService