import React, {ChangeEvent, useEffect, useState} from "react";
import s from "./ProfileInfo.module.css"

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<ProfileStatusPropsType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

    useEffect(() =>{
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={s.status}>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || '------'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus type={"text"}
                           value={status}/>
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks
