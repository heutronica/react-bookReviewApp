declare namespace BooksAPI {
    export type Id = {
        GET: {
            Success: {
                id: 'string'
                title: 'string'
                url: 'string'
                detail: 'string'
                review: 'string'
                reviewer: 'string'
                isMine: true
            }
        }
        PUT: {
            Success: {
                id: 'string'
                title: 'string'
                url: 'string'
                detail: 'string'
                review: 'string'
                reviewer: 'string'
                isMine: true
            }
            Error: {
                ErrorCode: number
                ErrorMessageJP: string
                ErrorMessageEN: string
            }
        }
    }
}
