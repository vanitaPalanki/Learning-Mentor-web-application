import React from 'react';

import UserProfileItem from './user-profile-item';

import './user-data.css';

const UserData = props => {
    return (
        <ul className="users-list">
            {props.item.map(user => (
                <UserProfileItem 
                    key={user.id}
                    id={user.id}
                    image={user.image}
                    name={user.name}
                />
            ))}
        </ul>
    );
};

export default UserData;