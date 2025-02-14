import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/SuccesPage.css"

const SuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div className="success-container">
            <div className="success-box">
                <h2>✅ Заказ оформлен!</h2>
                <p>Ваш заказ принят. Ожидайте сообщения от оператора.</p>
                <button className="success-button" onClick={() => navigate("/")}>
                    Вернуться в магазин
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;
