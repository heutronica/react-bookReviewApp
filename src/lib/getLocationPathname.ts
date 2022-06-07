interface StateType {
    state: {
        from: { pathname: string }
    }
}
// location.stateがunknownnなので、typeof location.state === 'object'で特定してみるものの、objectの中身がnullでエラーを吐かれたりするので、下記のような処理を実行

const isObject = (data: unknown): data is StateType => {
    return typeof data === 'object'
}

export const getLocationPathname = (data: unknown) => {
    if (!isObject(data)) {
        return '/'
    }
    data as StateType
    if (!data.state) {
        return '/'
    }
    return data.state.from.pathname
}
