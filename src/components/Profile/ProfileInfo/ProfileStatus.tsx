import s from "./ProfileInfo.module.css"
import {ReactComponent} from "*.svg";
import React, {ChangeEvent, LegacyRef} from "react";

// types
type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}
type ProfileStatusStateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<ProfileStatusPropsType, ProfileStatusStateType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render() {
        return <div>
            {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || '------'}</span>
                </div>
            }
            {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} onBlur={this.deactivateEditMode} autoFocus type={"text"}
                           value={this.state.status}/>
                </div>
            }
        </div>
    }

}

export default ProfileStatus