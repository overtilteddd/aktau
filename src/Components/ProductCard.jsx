import React, { useState } from 'react';
import './css/ProductCard.css';
import PopUp from './PopUp';

const ProductCard = (props) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handlePriceClick = () => {
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    return (
        <div>
            <div className="card">
                <div key={props.id}>
                    <img className='card_image' src={props.imageUrl} alt={props.name} />
                    <h3 className='card_name'>{props.name}</h3>
                    <button className='card_price' onClick={handlePriceClick}>
                        {props.price} Тенге
                    </button>
                </div>
            </div>

            {isPopupVisible && (
                <PopUp
                    productId={props.id}
                    onClose={closePopup}
                    onAddToCart={props.onAddToCart} // Передаем дальше
                />
            )}
        </div>
    );
};

export default ProductCard;
