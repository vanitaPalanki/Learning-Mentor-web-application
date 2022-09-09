import React from 'react';

import UserData from '../components/user-data';


const UserProfile = () => {
    const USER = [{
        id: 'u1', 
        name: 'Awashvin sharma', 
        image: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' 
    }];
    return <UserData item={USER} />;
}

export default UserProfile;