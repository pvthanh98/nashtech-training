import { Message } from '../databases/models/message.model';
import { User } from '../databases/models/user.model';
import ServiceResponse from '../types/service-response';

class MessageService {
    getMessage = async (data: any): Promise<ServiceResponse> => {
        const {conversationId} = data;
        const messages = await Message.find({
            conversation: conversationId
        }).limit(4).sort({
            created_at: -1
        });

        return {
            err:null,
            data: [...messages.reverse()]
        }
    }
}

export default MessageService