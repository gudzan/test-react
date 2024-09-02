import React from "react";
import useMockData from "./useMockData";

export default function MockData() {
    const { error, initialize, progress, status } = useMockData();
    const handleClick = () => {
        initialize();
    };
    return (
        <div className="container mt-5">
            <h3>Ты все удалил</h3>
            <h4>Хочешь загрузить данные заново?</h4>
            <ul>
                <li>Статус: {status}</li>
                <li>Прогресс: {progress}%</li>
                {error && <li>Ошибка: {error}</li>}
            </ul>
            <button className="btn btn-outline-dark" onClick={handleClick}>
                Загрузить
            </button>
        </div>
    );
}
