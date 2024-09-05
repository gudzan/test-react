import { Product } from "../type/Product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    tagTypes: ["Products"],
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl:
            "https://new-project853-default-rtdb.europe-west1.firebasedatabase.app/products",
    }),
    endpoints: (builder) => ({
        getAll: builder.query({
            query: () => `.json`,
            providesTags: (result, error, arg) => [
                { type: "Products", id: arg },
            ],
        }),
        get: builder.query({
            query: (id) => `/${id}.json`,
            providesTags: (result, error, id) => [{ type: "Products", id }],
        }),
        updateProductById: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/${id}/.json`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Products"],
        }),
        createProduct: builder.mutation({
            query: ({ ...body }) => ({
                url: `/${body.id}.json`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Products"],
        }),
        deleteProductById: builder.mutation({
            query(id) {
                return {
                    url: `/${id}.json`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["Products"],
        }),
    }),
});
export const {
    useGetAllQuery,
    useGetQuery,
    useCreateProductMutation,
    useUpdateProductByIdMutation,
    useDeleteProductByIdMutation,
} = productsApi;
