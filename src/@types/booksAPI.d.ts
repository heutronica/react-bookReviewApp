declare namespace BooksAPI {
    type GET = {
        Success: [BooksAPI.Id.GET]
    }

    type Error = {
        ErrorCode: number
        ErrorMessageJP: string
        ErrorMessageEN: string
    }
}
