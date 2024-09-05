import React from "react";

type FilterProps = {
    filter: boolean;
    disabled: boolean;
    handleToggleFilter: Function;
};

export default function Filter({
    filter,
    disabled,
    handleToggleFilter,
}: FilterProps) {
    const buttonColor = filter ? " btn-success" : " btn-outline-success";
    const buttonLiked = filter ? " bi-hand-thumbs-up-fill" : " bi-hand-thumbs-up";

    return (
        <div className="mb-3">
            <button
                disabled={disabled}
                className={`d-flex justify-content-between btn${buttonColor}`}
                onClick={() => handleToggleFilter()}
            >
                <i className={`bi me-2${buttonLiked}`}></i>Избранное
            </button>
        </div>
    );
}
