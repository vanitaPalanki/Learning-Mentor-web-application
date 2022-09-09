import React  from 'react';
 
//import { AuthContext } from '../../shared/context/auth-context';
import { Link } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';

import './home.css';

const Home = () => {
    //const auth = useContext(AuthContext);
    return (
        <div>
            <h2> Home page</h2>
            <Link to='/userProfile'>
                <Button type= 'button'>UserProfile</Button>
            </Link>
        
        </div>   
    )
};

export default Home;