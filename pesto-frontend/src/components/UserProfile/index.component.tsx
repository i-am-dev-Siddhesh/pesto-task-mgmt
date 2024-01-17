// Your component file
import React from 'react';
import Avatar from '../Avatar/index.component';

type UserProfileProps = {
    name: string;
    profileUrl: string
}
const UserProfile = ({ name, profileUrl }: UserProfileProps) => {
    return (
        <div className='flex gap-2 items-center'>
            <Avatar size={40} imageUrl={profileUrl} altText="User Profile Image" />
            <h2 className='text-white'>{name}</h2>
        </div>
    );
};

export default UserProfile;
