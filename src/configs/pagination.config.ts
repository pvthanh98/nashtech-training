const paginateProcess = (query: any) => {
    const limit = query.limit ? parseInt(query.limit) : 10;
    const page = query.page ? parseInt(query.page) : 1;
    const skip = (page - 1) * limit;

    return {
        limit,
        page,
        skip
    }
}

const paginateResponse = (page:Number, data: Array<any>) => {
    return {
        page,
        results: data
    }
}

export {
    paginateProcess,
    paginateResponse
};