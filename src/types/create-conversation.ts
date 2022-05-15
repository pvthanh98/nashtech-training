interface CreateConversationDto {
    userIds: Array<string>,
    name?: string,
    topic?:string
};

export default CreateConversationDto;