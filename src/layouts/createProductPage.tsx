import React, { useState, useEffect, ChangeEvent } from "react";
import TextField from "../component/form/textField";
import { Product, Rating } from "../type/Product";
import TextAreaField from "../component/form/textAreaField";
import { v4 as uuidv4 } from "uuid";
import { validate } from "../utils/validator";
import { errorConfig, ErrorMessage } from "../utils/errorConfig";

export default function CreateProductPage() {
    const [errors, setErrors] = useState<ErrorMessage[]>([]);

    const [newRating, setNewRating] = useState<Rating>({
        rate: null,
        count: null,
    });

    const [newProduct, setNewProduct] = useState<Product>({
        id: "",
        title: "",
        price: null,
        category: "",
        image: "",
        rating: newRating,
        description: "",
        like: false,
    });
    console.log(newProduct);
    

    useEffect(() => {
        validateFields();
    }, [newProduct]);

    function validateFields() {
        const errorProduct = validate(newProduct);
        const errorRating = validate(newRating);
        const common = errorProduct.concat(errorRating);
        setErrors(common);
        return errors.length === 0;
    }

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!validateFields()) return;
        const newId = uuidv4();
        setNewProduct((prevState) => ({
            ...prevState,
            id: newId,
        }));
        console.log(newProduct);
    }

    function handleChangeProduct(
        event:
            | ChangeEvent<HTMLInputElement>
            | ChangeEvent<HTMLTextAreaElement>
    ) {
        const value = event.target.type === "text" ? event.target.value :  +event.target.value
        setNewProduct((prevState) => ({
            ...prevState,
            [event.target.name]: value,
        }));
    }

    function handleChangeRating(event: React.ChangeEvent<HTMLInputElement>) {
        const tempRating = {
            ...newRating,
            [event.target.name]: +event.target.value,
        };
        setNewRating(tempRating);
        setNewProduct((prevState) => ({
            ...prevState,
            rating: tempRating,
        }));
    }

    function getErrorForField(fieldName: string) {
        const error = errors.find((element) => element.fieldName === fieldName);
        return error?.messages[0];
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2 shadow p-5">
                    <h1 className="mb-4">Создание нового товара</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <TextField
                                label="Заголовок"
                                name="title"
                                type="text"
                                value={newProduct.title}
                                onChange={handleChangeProduct}
                                error={getErrorForField("title")}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Цена"
                                name="price"
                                type="number"
                                value={newProduct.price}
                                onChange={handleChangeProduct}
                                error={getErrorForField("price")}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Категория"
                                name="category"
                                type="text"
                                value={newProduct.category}
                                onChange={handleChangeProduct}
                                error={getErrorForField("category")}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Ссылка на изображение товара"
                                name="image"
                                type="text"
                                value={newProduct.image}
                                onChange={handleChangeProduct}
                                error={getErrorForField("image")}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Рейтинг товара"
                                name="rate"
                                type="number"
                                value={newRating.rate}
                                onChange={handleChangeRating}
                                error={getErrorForField("rate")}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Кол-во проголосовавших за товар"
                                name="count"
                                type="number"
                                value={newRating.count}
                                onChange={handleChangeRating}
                                error={getErrorForField("count")}
                            />
                        </div>
                        <div>
                            <TextAreaField
                                label="Описание"
                                name="description"
                                value={newProduct.description}
                                onChange={handleChangeProduct}
                                error={getErrorForField("description")}
                            />
                        </div>
                        <button
                            className="w-100 mx-auto btn btn-primary"
                            type="submit"
                            disabled={false}
                        >
                            Отправить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
