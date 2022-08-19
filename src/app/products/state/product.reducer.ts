import { createReducer, on } from "@ngrx/store";

import { Product } from "../product";
import { ProductPageActions, ProductApiActions } from "./actions"


export type ProductState = {
    showProductCode: boolean
    currentProductId: number | null
    products: Product[],
    error: string
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
}

export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductPageActions.toggleProductCode,
        (state): ProductState => ({
            ...state,
            showProductCode: !state.showProductCode
        })
    ),
    on(ProductPageActions.setCurrentProduct,
        (state, action): ProductState => ({
            ...state,
            currentProductId: action.currentProductId
        })
    ),
    on(ProductPageActions.clearCurrentProduct,
        (state): ProductState => ({
            ...state,
            currentProductId: null
        })
    ),
    on(ProductPageActions.initializeCurrentProduct,
        (state): ProductState => ({
            ...state,
            currentProductId: 0
        })
    ),
    on(ProductApiActions.loadProductsSuccess,
        (state, action): ProductState => ({
            ...state,
            products: action.products
        })
    ),
    on(ProductApiActions.loadProductsFailure,
        (state, action): ProductState => ({
            ...state,
            products: [],
            error: action.error
        })
    ),
    on(ProductApiActions.updateProductSuccess,
        (state, action): ProductState => {
            const updatedProducts = state.products
                .map(product => product.id === action.product.id ? action.product : product)
            return {
                ...state,
                products: updatedProducts,
                currentProductId: action.product.id,
                error: ''
            }
        }
    ),
    on(ProductApiActions.updateProductFailure,
        (state, action): ProductState => ({
            ...state,
            error: action.error
        })
    ),
    on(ProductApiActions.createProductSuccess,
        (state, action): ProductState => ({
            ...state,
            products: [...state.products, action.product],
            error: ''
        })
    ),
    on(ProductApiActions.createProductFailure,
        (state, action): ProductState => ({
            ...state,
            error: action.error
        })
    ),
    on(ProductApiActions.deleteProductSuccess,
        (state, action): ProductState => {
            const updatedProducts = state.products
                .filter(product => product.id !== action.productId)
            return {
                ...state,
                products: updatedProducts,
                currentProductId: null,
                error: ''
            }
        }
    ),
    on(ProductApiActions.deleteProductFailure,
        (state, action): ProductState => ({
            ...state,
            error: action.error
        })
    ),
)
