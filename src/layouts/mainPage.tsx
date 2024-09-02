import React from "react";
import ProductsList from "../component/productsList";

export default function MainPage() {
    return (
        <div className="container mt-5">
            <h1 className="mb-3">Fake Store</h1>
            <ProductsList />
        </div>
    );
}
