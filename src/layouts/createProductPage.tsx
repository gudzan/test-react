import React, { useState, ChangeEvent } from "react";
import TextField from "../component/form/textField";
import { Product } from "../type/Product";

export default function CreateProductPage() {
    const [data, setData] = useState({
        title: "",
        // price: "",
        // description: "",
        // category: "",
        // image: "",
    });

    const [newProduct, setNewProduct] = useState<Product>();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        //const dataChange = event.target;
        setData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-3">Создание нового товара</h1>
            <TextField
                label="Заголовок"
                name="title"
                value={data.title}
                onChange={handleChange}
                // error={errors.title}
            />
        </div>
    );
}
