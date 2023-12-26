import React from 'react'
import s from './ProfileInfo.module.css'

const ProfileInfo: React.FC = () => {
	return (
		<div>
			<img
				src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3EHqf4sCRw7OupIheEHLyp8LAislACRZz9LbULv5IXLvXUAWGJ76RvlonKwd4X2rvuw&usqp=CAU'
				alt='some img'
			/>
      <div className={s.descriptionBlock}>
        ava + description
      </div>
		</div>
	)
}

export default ProfileInfo