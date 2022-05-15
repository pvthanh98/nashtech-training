import ServiceResponse from '../types/service-response';

class UploadService {
    upload = async (data: any): Promise<ServiceResponse> => {
        

        return {
            err:null,
            data: ""
        }
    }
}

export default UploadService