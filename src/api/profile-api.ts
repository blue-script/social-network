import {APIResponseType, instance} from "./api";

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get<ProfileRequestType>(`profile/${userId}`).then(res => res.data)
    },
    getStatus(userId: string) {
        return instance.get<string>(`profile/status/${userId}`).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status/`, {status: status}).then(res => res.data)
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<APIResponseType<PhotosType>>(`profile/photo`, formData,
            {headers: {'Content-Type': 'multipart/form-data'}}
        ).then(res => res.data)
    },
    saveProfile(profile: Partial<ProfileRequestType>) {
        return instance.put<APIResponseType>(`profile`, profile).then(res => res.data)
    }
}

export type PhotosType = {
    small: string, large: string
}
export type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
export type ProfileRequestType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}