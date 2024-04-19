import {instance} from "./api";

export const securityAPI = {
    getCaptchaURL() {
        return instance.get<CapchaType>(`security/get-captcha-url`).then(res => res.data)
    }
}

export type CapchaType = {
    url: string
}