export type UserType = {
    name: string
    id: number
    photos: {
        small: null | string
        large: null | string
    }
    status: null | string
    followed: boolean
}

type Dialog =  {id: number, name: string}
type Message = {id: number, message: string}
export type DialogsPageType = {
    dialogs: Dialog[]
    messages: Message[]
}