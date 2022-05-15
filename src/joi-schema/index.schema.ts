import * as Joi from 'joi';
import { JobTitle } from '../constants/job-title.constant';

const jobTitles = [];
for (const [key, value] of Object.entries(JobTitle)){
    jobTitles.push(value);
}

const schemas = { 
    generateNickName: Joi.object().keys({ 
        name: Joi.string().required(),
        old: Joi.number().required(),
        address: Joi.string().required(),
        staffId: Joi.string().required(),
        type: Joi.string().valid(...jobTitles).required()
    }),

    createAnimal: Joi.object().keys({
        name: Joi.string().required(),
        old: Joi.number().required()
    }),

    userRegister: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        birthday: Joi.date().required(),
        address: Joi.object().keys({
            city: Joi.string(),
            country: Joi.string(),
            postcode: Joi.string(),
            state: Joi.string(),
        }),
        password: Joi.string().required(),
        email: Joi.string().required(),
    }),

    signIn: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    }),

    createConversations: Joi.object().keys({
        userIds: Joi.array().items(
           Joi.string()
        ).required(),
        name: Joi.string().default(""),
        topic: Joi.string().default("")
    }),

    // uploadFile: Joi.object().keys({
    //     topic: Joi.string().default("")
    // })
}; 

export default schemas;