export const editAccess = () => {
    return process.env.REACT_APP_HOPE_PLAYER_EDIT_ACCESS === 1 || process.env.REACT_APP_HOPE_PLAYER_EDIT_ACCESS === '1'
}

export const serverUrl = () => {
    return process.env.REACT_APP_HOPE_PLAYER_SERVER_URL
}