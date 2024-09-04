export interface ErrorConfig {
    fieldName: string;
    methods: ErrorConfigMethod[];
}

export interface ErrorConfigMethod {
    methodName: string;
    value?: number | undefined;
    message: string;
}

export interface ErrorMessage {
    fieldName: string;
    messages: string[];
}

export const errorConfig: ErrorConfig[] = [
    {
        fieldName: "title",
        methods: [
            {
                methodName: "isRequired",
                message: "Поле обязательно для заполнения",
            },
            {
                methodName: "maxLength",
                value: 100,
                message: "Поле не может содержать более чем 100 символов",
            },
        ],
    },

    {
        fieldName: "price",
        methods: [
            {
                methodName: "isRequired",
                message: "Поле обязательно для заполнения",
            },
            {
                methodName: "maxLength",
                value: 100,
                message: "Поле не может содержать более чем 100 символов",
            },
            {
                methodName: "maxValues",
                value: 10000,
                message: "Максимальная цена 10,000 $",
            },
        ],
    },
    {
        fieldName: "category",
        methods: [
            {
                methodName: "isRequired",
                message: "Поле обязательно для заполнения",
            },
            {
                methodName: "maxLength",
                value: 100,
                message: "Поле не может содержать более чем 100 символов",
            },
        ],
    },
    {
        fieldName: "image",
        methods: [
            {
                methodName: "isRequired",
                message: "Поле обязательно для заполнения",
            },
            {
                methodName: "isLinkToImage",
                message: "Поле дожно содержать ссылку на картинку (.jpg)",
            },
            {
                methodName: "maxLength",
                value: 300,
                message: "Поле не может содержать более чем 300 символов",
            },
        ],
    },
    {
        fieldName: "rate",
        methods: [
            {
                methodName: "isRequired",
                message: "Поле обязательно для заполнения",
            },
            {
                methodName: "maxLength",
                value: 100,
                message: "Поле не может содержать более чем 100 символов",
            },
            {
                methodName: "maxValues",
                value: 5,
                message: "Максимально возможный рейтинг 5.0",
            },
        ],
    },
    {
        fieldName: "count",
        methods: [
            {
                methodName: "isRequired",
                message: "Поле обязательно для заполнения",
            },
            {
                methodName: "maxLength",
                value: 100,
                message: "Поле не может содержать более чем 100 символов",
            },
            {
                methodName: "minValues",
                value: 1,
                message: "Минимально возможное кол-во 1",
            },
            {
                methodName: "maxValues",
                value: 1000,
                message: "Максимально возможное кол-во 1000",
            },
        ],
    },
    {
        fieldName: "description",
        methods: [
            {
                methodName: "isRequired",
                message: "Поле обязательно для заполнения",
            },
            {
                methodName: "maxLength",
                value: 800,
                message: "Поле не может содержать более чем 800 символов",
            },
        ],
    },
];
