import React, { useState, useEffect, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../component/form/textField";
import { Product, Rating } from "../type/Product";
import TextAreaField from "../component/form/textAreaField";
import { v4 as uuidv4 } from "uuid";
import { validate } from "../utils/validator";
import { ErrorMessage } from "../utils/errorConfig";
import { useCreateProductMutation } from "../redux/productsApi";

export default function CreateProductPage() {
    const [createProduct] = useCreateProductMutation();
    const history = useHistory();
    const [errors, setErrors] = useState<ErrorMessage[]>([]);
    const [checking, setChecking] = useState(false);

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

    function backToProductList() {
        history.push("/");
    }

    useEffect(() => {
        if (checking === true) {
            validateFields();
        }
    }, [newProduct]);

    function validateFields() {
        const errorProduct = validate(newProduct);
        const errorRating = validate(newRating);
        const common = errorProduct.concat(errorRating);
        setErrors(common);
        return errors.length === 0 && checking === true ? true : false;
    }

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        setChecking(true);
        if (!validateFields()) return;
        console.log(newProduct);
        createProduct({ ...newProduct });
        backToProductList();
    }

    function handleChangeProduct(
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) {
        if (!newProduct.id) {
            const newId = uuidv4();
            setNewProduct((prevState) => ({
                ...prevState,
                id: newId,
            }));
        }
        const value =
            event.target.type === "text" ||
            event.target.type === "textarea" ||
            event.target.value === ""
                ? event.target.value
                : +event.target.value;
        setNewProduct((prevState) => ({
            ...prevState,
            [event.target.name]: value,
        }));
    }

    function handleChangeRating(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value === "" ? null : +event.target.value;
        const tempRating = {
            ...newRating,
            [event.target.name]: value,
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
            <button
                className="btn btn-outline-secondary mb-3 col-md-8 offset-md-2 "
                onClick={backToProductList}
                style={{ maxWidth: "90px" }}
            >
                <i className="bi bi-arrow-left"></i> Назад
            </button>
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
                                type="text"
                                value={newProduct.description}
                                onChange={handleChangeProduct}
                                error={getErrorForField("description")}
                            />
                        </div>
                        <button
                            className="w-100 mx-auto btn btn-primary"
                            type="submit"
                            disabled={errors.length !== 0}
                        >
                            Отправить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
