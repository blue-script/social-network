import React from 'react'
import s from './ProfileInfo.module.css'

const ProfileInfo: React.FC = () => {
	return (
		<div>
			<img
				src='https://mywowo.net/media/images/cache/dubai_img_worlds_of_adventure_01_presentazione_jpg_1200_630_cover_85.jpg'
				alt='some img'
			/>
      <div className={s.descriptionBlock}>
        ava + description
      </div>
		</div>
	)
}

export default ProfileInfo