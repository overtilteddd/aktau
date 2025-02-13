import React from "react";
import "./css/CartPopup.css";

const CartPopup = ({ items, onClose }) => {
    return (
        <div className="cart-popup active">
            <div className="cart-popup-content">
                <button className="cart-popup-close" onClick={onClose}>×</button>
                <h2>Корзина</h2>
                {items.length === 0 ? (
                    <p>Корзина пуста</p>
                ) : (
                    <ul>
                        {items.map((item, index) => (
                            <li key={index}>
                                {item.product.name} - {item.quantity} шт. ({item.flavor})
                            </li>
                        ))}
                    </ul>
                )}
                <button className="checkout">Оформить заказ</button>
            </div>
        </div>
    );
};

export default CartPopup;
