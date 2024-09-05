import React from "react";
import { Product } from "../type/Product";
import { Link } from "react-router-dom";
import {
    useDeleteProductByIdMutation,
    useUpdateProductByIdMutation,
} from "../redux/productsApi";

type ProductCardProps = {
    product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
    const buttonLiked = product.like
        ? " bi-hand-thumbs-up-fill"
        : " bi-hand-thumbs-up";
    const buttonLikedFill = product.like
        ? " btn-success"
        : " btn-outline-success";
    const [deleteProduct] = useDeleteProductByIdMutation();
    const [updateProduct] = useUpdateProductByIdMutation();

    function handleClickLike(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        updateProduct({ id: product.id, like: !product.like });
    }

    function handleClickRemove(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        deleteProduct(product.id);
    }

    return (
        <Link
            className="card-link"
            key={product.id}
            to={`/products/${product.id}`}
        >
            <div className="col product-border">
                <div className="row product-card g-0 p-2 rounded border border-1 ">
                    <div className="product-img col-md-4 d-flex justify-content-center align-items-center">
                        <img
                            src={product.image}
                            className="productCard__img img-fluid"
                        />
                    </div>
                    <div className="product-body col-md-8 d-flex justify-content-center">
                        <div className="body pt-2 ms-3 position-relative">
                            <h6 className="title">{product.title}</h6>
                            <p className="description">{product.description}</p>
                            <p className="price">{product.price} $</p>
                            <div className="position-absolute product-button-box">
                                <button
                                    className={`btn border border-1 me-md-2${buttonLikedFill}`}
                                    type="button"
                                    onClick={handleClickLike}
                                >
                                    <i className={`bi${buttonLiked}`}></i>
                                </button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={handleClickRemove}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
