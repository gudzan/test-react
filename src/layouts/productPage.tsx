import React from "react";
import { useHistory } from "react-router-dom";
import { Product } from "../type/Product";
import { RouteComponentProps } from "react-router-dom";
import Spinner from "../component/spinner";
import { useGetQuery } from "../redux/productsApi";

interface RouteParams {
    productId: string;
}

export default function ProductPage(props: RouteComponentProps<RouteParams>) {
    const productId = props.match.params.productId;
    const { data, isLoading } = useGetQuery(productId);
    const product: Product = data;
    const history = useHistory();

    function handleClick() {
        history.push("/");
    }

    if (isLoading) {
        return (
            <div className="container mt-5">
                <Spinner />
            </div>
        );
    } else if (data === null) {
        return (
            <div className="container mt-5">
                <button
                    className="btn btn-outline-secondary mb-3"
                    onClick={handleClick}
                >
                    <i className="bi bi-arrow-left"></i> Назад
                </button>
                <h3>Товар не найден</h3>
            </div>
        );
    } else {
        return (
            <div className="container mt-5">
                <button
                    className="btn btn-outline-secondary mb-3"
                    onClick={handleClick}
                >
                    <i className="bi bi-arrow-left"></i> Назад
                </button>
                <div className="card p-3 productPage-card">
                    <div className="row ">
                        <div className="col-md-4 d-flex justify-content-center">
                            <img
                                src={product.image}
                                className="img-fluid rounded-start"
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <div className="card-text">
                                    <b>Описание товара:</b>{" "}
                                    {product.description}
                                </div>
                                <div className="card-text">
                                    <b>Категория:</b> {product.category}
                                </div>
                                <div className="card-text">
                                    <b>Цена:</b> {product.price} $
                                </div>
                                <div className="card-text">
                                    <b>Рейтинг:</b> {product.rating.rate} / 5
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
