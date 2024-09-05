import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Product } from "../type/Product";
import ProductCard from "./productCard";
import Filter from "./filter";
import Spinner from "./spinner";
import { useGetAllQuery } from "../redux/productsApi";
import MockData from "../mockData/mockData";
import Pagination from "./pagination";

export default function ProductsList() {
    const history = useHistory();
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchData, setSearchData] = useState("");
    const [filter, setFilter] = useState(false);
    const [filterButtonDisabled, setFilterButtonDisabled] = useState(true);
    const { data, isLoading } = useGetAllQuery("", {
        pollingInterval: 30000,
        skipPollingIfUnfocused: true,
    });
    const [products, setProducts] = useState<Product[]>([]);

    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        setSearchData(event.target.value);
    }

    const handleCurrentPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
    };

    const handlePreviousPage = () => {
        const previousPage = currentPage - 1;
        setCurrentPage(previousPage);
    };

    function paginate(array: Product[], currentPage: number, pageSize: number) {
        const startIndex = (currentPage - 1) * pageSize;
        return [...array].splice(startIndex, pageSize);
    }

    function existFavorites() {
        if (data !== undefined) {
            return (
                products.findIndex((item: Product) => item.like === true) !== -1
            );
        }
    }

    function toCreateProduct() {
        history.push("/create-product");
    }

    useEffect(() => {
        if (data !== undefined) {
            const dataValues: Product[] = data !== null ? Object.values(data) : [];
            setProducts(dataValues);
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

    function handleToggleFilter() {
        setCurrentPage(1);
        filter === true ? setFilter(false) : setFilter(true);
    }

    function searchProduct(searchProduct: Product[]) {
        if (searchData.length > 0) {
            return searchProduct.filter((p) => {
                const common = p.title + p.category + p.description + p.price;
                return common.toLowerCase().includes(searchData.toLowerCase());
            });
        } else {
            return searchProduct;
        }
    }

    function filterProduct(filterProduct: Product[]) {
        if (filter === true) {
            return filterProduct.filter((elem) => elem.like === true);
        } else {
            return filterProduct;
        }
    }

    const productsSearch: Product[] = searchProduct(products);
    const productsFilter: Product[] = filterProduct(productsSearch);
    const productsCount = productsFilter.length;
    const productsFinish = paginate(productsFilter, currentPage, pageSize);

    if (isLoading || data === undefined) {
        return <Spinner />;
    } else if (!isLoading && data === null) {
        return <MockData />;
    } else {
        return (
            <>
                <div className="d-flex justify-content-between gap ">
                    <Filter
                        filter={filter}
                        disabled={filterButtonDisabled}
                        handleToggleFilter={handleToggleFilter}
                    />
                    <input
                        className=" form-control"
                        placeholder="Search..."
                        type="text"
                        value={searchData}
                        onChange={handleSearch}
                    />
                    <div className="mb-3 ">
                        <button
                            className="btn btn-primary d-flex justify-content-between"
                            onClick={toCreateProduct}
                        >
                            <i className="bi bi-plus-lg me-2"></i>Добавить
                        </button>
                    </div>
                </div>

                <div className="row row-cols-2 g-2 mb-5">
                    {productsFinish.map((item: Product) => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>
                {pageSize < productsCount && (
                    <Pagination
                        onSelectPage={handleCurrentPage}
                        onNextPage={handleNextPage}
                        onPreviousPage={handlePreviousPage}
                        currentPage={currentPage}
                        itemsCount={productsCount}
                        pageSize={pageSize}
                    />
                )}
            </>
        );
    }
}
