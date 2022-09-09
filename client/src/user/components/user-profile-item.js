import React from 'react';

import { Link } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Avatar from '../../shared/components/UIElements/Avatar';
import './user-profile-item.css';

const UserProfileItem = props => {
    return (
        <li className="user-item">
            <div className="user-item__content">
                <div className="user-item__image"> 
                    <Avatar image={props.image} alt={props.name} />
                </div>
                <div>
                    <h2 style={{color:"black"}}>{props.name}</h2>
                </div>
            </div>
            <div>
                <Link to='/user/uid'>
                    <Button type='button'>UpdateProfile</Button>
                </Link>
            </div>
        </li>
    )
}

export default UserProfileItem; 