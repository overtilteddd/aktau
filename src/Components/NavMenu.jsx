import React, {useEffect, useState} from 'react';
import './css/NavMenu.css';
const NavMenu = () => {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        fetch('http://localhost:5000/api/categories')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setIsLoaded(true);
            });
    }, []);
    return (
        <div className="par">
         <nav className="menu">
             <ul>
                 {categories.map(item => (
                     <li key={item.id}>
                         <a href="">{item.name}</a>
                     </li>
                 ))}
             </ul>
         </nav>
        </div>
    );
};

export default NavMenu;