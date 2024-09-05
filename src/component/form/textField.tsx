import React, { ChangeEvent } from "react";

type TextFieldProps = {
    label: string;
    name: string;
    value: any | null;
    type: string;
    error?: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function TextField({
    label,
    name,
    value,
    type,
    error,
    onChange,
}: TextFieldProps) {

    function getInputClassName() {
        let inputClassName = "form-control";
        if (error) {
            inputClassName += " is-invalid";
        }
        return inputClassName;
    }
    
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="has-validation input-group">
                <input
                    className={getInputClassName()}
                    type={type ? type : "text"}
                    id={name}
                    name={name}
                    onChange={onChange}
                    value={value !== null ? value : ""}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
}
