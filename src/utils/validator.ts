import { errorConfig, ErrorMessage, ErrorConfigMethod } from "./errorConfig";

export function validate(data: any) {
    const errors: ErrorMessage[] = [];

    function compare(data: any, method: ErrorConfigMethod) {
        let statusCompare;
        switch (method.methodName) {
            case "isRequired": {
                if (typeof data === "boolean") {
                    statusCompare = !data;
                } else if (data !== null) {
                    statusCompare = data.toString().trim() === "";
                } else {
                    statusCompare = true;
                }
                break;
            }
            case "maxLength": {
                if (method.value && data !== null) {
                    statusCompare = data.length > method.value;
                }
                break;
            }
            case "maxValues": {
                if (method.value && data !== null) {
                    statusCompare = data > method.value;
                }
                break;
            }
            case "minValues": {
                if (method.value && data !== null) {
                    statusCompare = data < method.value;
                }
                break;
            }
            case "isLinkToImage": {
                if (data !== null) {
                    const linkReqExp =
                        /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*.jpg$/g;
                    statusCompare = !linkReqExp.test(data);
                    break;
                }
                break;
            }
            default:
                break;
        }
        if (statusCompare) {
            return method.message;
        }
    }

    const keys = Object.keys(data);
    errorConfig.forEach((config) => {
        if (keys.indexOf(config.fieldName) !== -1) {
            config.methods.forEach((metod) => {
                const error = compare(data[config.fieldName], metod);
                if (error) {
                    const errorMessage = errors.find(
                        (e: ErrorMessage) => e.fieldName === config.fieldName
                    );
                    if (errorMessage) {
                        errorMessage.messages.push(error);
                    } else {
                        errors.push({
                            fieldName: config.fieldName,
                            messages: [error],
                        });
                    }
                }
            });
        }
    });
    return errors;
}
