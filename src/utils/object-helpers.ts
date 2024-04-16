import {UserType} from "../types/types";

export const updateObjectInArray = <K extends keyof UserType>(items: UserType[], itemId: number, objPropName: K, newObjProps: any) => {
    return items.map((u: UserType) => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}