import React, { useState } from "react";
import "./css/OrderDetailsPage.css"
import {useNavigate} from "react-router-dom";

const OrderDetailsPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        comment: ""
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/success");
        console.log("Order submitted", formData);
    };

    return (
        <div className="order-container">
            <h2 className="order-title">Оформление заказа</h2>
            <div className="delivery-options">
                <div className="delivery-option">
                    🚚 Доставка до подъезда по городу Актау - 1000 Т
                </div>
                <div className="delivery-option">
                    📦 Самовывоз - +7 700 667 46 27 Egor M.
                </div>
            </div>

            <h3 className="section-title">Получатель</h3>
            <form className="order-form" onSubmit={handleSubmit}>
                <div className="input-row">
                    <input type="text" name="name" placeholder="Имя" value={formData.name} onChange={handleChange} />
                    <input type="text" name="address" placeholder="Адрес доставки" value={formData.address} onChange={handleChange} />
                </div>
                <div className="input-row">
                    <input type="text" name="phone" placeholder="Телефон" value={formData.phone} onChange={handleChange} />
                    <input type="text" name="comment" placeholder="Комментарий" value={formData.comment} onChange={handleChange} />
                </div>
                <div className="order-summary">
                    <h3>Заказ на 14999 Т</h3>
                </div>
                <button type="submit" className="order-button">Оформить заказ</button>
            </form>
        </div>
    );
};

export default OrderDetailsPage;