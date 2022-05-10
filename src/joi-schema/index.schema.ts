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
    })
}; 

export default schemas;