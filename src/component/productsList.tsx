import React, { useEffect, useState } from "react";
import { Product } from "../type/Product";
import ProductCard from "./productCard";
import Filter from "./filter";
import Spinner from "./spinner";
import { useGetAllQuery } from "../redux/productsApi";
import MockData from "../mockData/mockData";

export default function ProductsList() {
    const [filter, setFilter] = useState(false);
    const [filterButtonDisabled, setFilterButtonDisabled] = useState(true);
    const { data, isLoading } = useGetAllQuery("");
    const [products, setProducts] = useState<Product[]>([]);

    function existFavorites() {
        if (data !== undefined) {
            return products.findIndex((item: Product) => item.like === true) === -1 ? false : true;
        }
    }

    useEffect(() => {
        if (data !== undefined) {
            const dataValues: Product[] = data !== null ? Object.values(data) : [];
            if (filter === true) {
                setProducts(dataValues.filter((elem) => elem.like === true));
            } else {
                setProducts(dataValues);
            }
        }
    }, [data]);

    useEffect(() => {
        if (existFavorites()) {
            setFilterButtonDisabled(false);
        } else {
            setFilter(false);
            setFilterButtonDisabled(true);
        }
    }, [products]);

    useEffect(() => {
        if (filter === true) {
            setProducts(products.filter((elem) => elem.like === true));
        } else {
            setProducts(data ? Object.values(data) : []);
        }
        if (products.length !== 0) {
            setFilterButtonDisabled(false);
        } else {
            setFilterButtonDisabled(true);
        }
    }, [filter]);

    function handleToggleFilter() {
        filter === true ? setFilter(false) : setFilter(true);
    }

    if (isLoading || data === undefined) {
        return <Spinner />;
    } else if (!isLoading && data === null) {
        return <MockData />;
    } else {
        return (
            <>
                <Filter
                    filter={filter}
                    disabled={filterButtonDisabled}
                    handleToggleFilter={handleToggleFilter}
                />
                <div className="row row-cols-2 g-2 mb-5">
                    {products.map((item: Product) => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>
            </>
        );
    }
}
