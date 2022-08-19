import * as AppState from "../../state/app.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppFeatures } from "../../state/app.state";
import { ProductState } from "./product.reducer";


export type State = AppState.State & { products: ProductState }

const getProductState = createFeatureSelector<ProductState>(AppFeatures.products)


export const getShowProductCode = createSelector(
    getProductState,
    state => state.showProductCode
)

export const getCurrentProductId = createSelector(
    getProductState,
    state => state.currentProductId
)

export const getCurrentProduct = createSelector(
    getProductState,
    getCurrentProductId,
    (state, currentProductId) => {
        if (currentProductId === 0) {
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            }
        } else {
            return currentProductId ? state.products.find(product => product.id === currentProductId) ?? null : null
        }
    }
)

export const getProducts = createSelector(
    getProductState,
    state => state.products
)

export const getError = createSelector(
    getProductState,
    state => state.error
)
