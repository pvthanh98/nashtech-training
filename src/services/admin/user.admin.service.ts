import { paginateProcess, paginateResponse } from "../../configs/pagination.config";
import User from "../../databases/models/user.model"
import { ErrorTemplate } from "../../template/error.template";
import ServiceResponse from "../../types/service-response"

class UserAdminService {
    public getUsers = async (query: any): Promise<ServiceResponse> => {
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
            .find(filterParas)
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

export default UserAdminService