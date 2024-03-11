import s from "./ProfileInfo.module.css"
import {ReactComponent} from "*.svg";
import React from "react";

class ProfileStatus extends React.Component<any, any> {
    state = {
        editMode: false
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
    }

    render() {
        return <div>
            {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                </div>
            }
            {this.state.editMode &&
                <div>
                    <input onBlur={this.deactivateEditMode} autoFocus type={"text"} value={this.props.status}/>
                </div>
            }
        </div>
    }

}

export default ProfileStatus