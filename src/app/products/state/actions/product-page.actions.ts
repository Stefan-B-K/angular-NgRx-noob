import { createAction, props } from "@ngrx/store";
import { Product } from "../../product";


export const toggleProductCode = createAction('[Products Page] Toggle Product Code')

export const setCurrentProduct = createAction(
    '[Products Page] Set Current Product',
    props<{ currentProductId: number }>()
)

export const clearCurrentProduct = createAction('[Products Page] Clear Current Product')

export const initializeCurrentProduct = createAction('[Products Page] Initialize Current Product')

export const loadProducts = createAction('[Products Page] Load')

export const updateProduct = createAction(
    '[Products Page] Update Product',
    props<{ product: Product }>()
)

export const createProduct = createAction(
    '[Products Page] Create Product',
    props<{ product: Product }>()
)

export const deleteProduct = createAction(
    '[Products Page] Delete Product',
    props<{ productId: number }>()
)


