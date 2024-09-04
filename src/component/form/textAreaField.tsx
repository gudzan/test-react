import React, { ChangeEvent } from "react";

type TextAreaFieldProps = {
    label: string;
    name: string;
    value: any | null;
    type: string;
    error?: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextAreaField({
    label,
    name,
    value,
    type,
    error,
    onChange,
    ...rest
}: TextAreaFieldProps) {
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
                <textarea
                    className={getInputClassName()}
                    id={name}
                    name={name}
                    onChange={onChange}
                    value={value !== null ? value : ""}
                    {...rest}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
}
