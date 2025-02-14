import React from "react";
import "./css/CartPopup.css";
import { useNavigate } from "react-router-dom";

const CartPopup = ({ items, onClose }) => {
    const navigate = useNavigate();

    // Вычисляем общую сумму заказа
    const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

    const handleCheckout = () => {
        navigate("/checkout", { state: { items, totalPrice } });
    };

    return (
        <div className="cart-popup active">
            <div className="cart-popup-content">
                <button className="cart-popup-close" onClick={onClose}>×</button>
                <h2>Корзина</h2>
                {items.length === 0 ? (
                    <p>Корзина пуста</p>
                ) : (
                    <ul className="cart-items">
                        {items.map((item, index) => (
                            <li key={index} className="cart-item">
                                <span className="cart-name">{item.product.name}</span>
                                <span className="cart-flavor">Вкус: {item.flavor}</span>
                                <span className="cart-quantity">Количество: {item.quantity}</span>
                                <span className="cart-price">Цена: {item.product.price * item.quantity} Т</span>
                            </li>
                        ))}
                    </ul>
                )}
                {items.length > 0 && (
                    <>
                        <h3>Итого: {totalPrice} Т</h3>
                        <button className="checkout" onClick={handleCheckout}>Оформить заказ</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartPopup;
