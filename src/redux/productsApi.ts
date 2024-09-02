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
            providesTags: ["Products"],
        }),
        get: builder.query({
            query: (id) => `/${id}.json`,
        }),
        updateProductById: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/${id}/.json`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Products"],
        }),
        putProducts: builder.mutation({
            query: (body) => ({
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
    usePutProductsMutation,
    useUpdateProductByIdMutation,
    useDeleteProductByIdMutation,
} = productsApi;
