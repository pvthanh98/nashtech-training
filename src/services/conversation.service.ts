import { Conversation } from '../databases/models/conversation.model';
import { User } from '../databases/models/user.model';
import CreateConversationDto from '../types/create-conversation';
import ServiceResponse from '../types/service-response';

class ConversationService {
    createConversation = async (data: CreateConversationDto, ownerId: string): Promise<ServiceResponse> => {
        const { userIds, name, topic } = data;
        if (userIds.length === 1) {
            /**
             * Incase the length of array is 1, it means P2P conversation;
             * */

            /**
             * Check if the P2P conversation existed
             */
            const conversation = await Conversation.findOne({
                $and: [
                    {
                        users: {
                            $all: [
                                ownerId,
                                userIds[0]
                            ]
                        }
                    }, {
                        users: {
                            $size: 2
                        }
                    }
                ]
            })

            if (conversation) {
                return {
                    data: conversation,
                    err: null
                }
            } {
                /**
                 * Create new P2P conversation
                 */
                const conv = new Conversation({
                    name,
                    topic,
                    users: [
                        ownerId,
                        userIds[0]
                    ],
                    messages: [],
                });
                await conv.save();
                return {
                    data: conv,
                    err: null
                }
            }

        }

        /** 
         * Create Group conversation 
         * + if the length of userids is greater than 1
         * */
        const conv = new Conversation({
            name,
            topic,
            users: [
                ownerId,
                ...userIds
            ],
            messages: [],
        });
        await conv.save();
        return {
            data: conv,
            err: null
        }
    }
}

export default ConversationService