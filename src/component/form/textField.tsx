import React, { MouseEvent,ChangeEvent } from "react";

type TextFieldProps = {
    label: string;
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>)=>void
};

export default function TextField({
    label,
    name,
    value,
    onChange,
    ...rest
}: TextFieldProps) {


    function handleClick(event: MouseEvent<HTMLDivElement>) {
        const dataChange = event;
        console.log(dataChange);
    }


    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="has-validation input-group">
                <input
                    id={name}
                    name={name}
                    onChange={onChange}
                    onClick={handleClick}
                    {...rest}
                />
            </div>
        </div>
    );
}
