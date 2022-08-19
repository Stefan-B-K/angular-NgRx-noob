import { createAction, props } from "@ngrx/store";
import { Product } from "../../product";


export const loadProductsSuccess = createAction(
    '[Products API] Load Success',
    props<{ products: Product[] }>()
)

export const loadProductsFailure = createAction(
    '[Products API] Load Failure',
    props<{ error: string }>()
)


export const updateProductSuccess = createAction(
    '[Products API] Update Product Success',
    props<{ product: Product }>()
)

export const updateProductFailure = createAction(
    '[Products API] Update Product Failure',
    props<{ error: string }>()
)


export const  createProductSuccess = createAction(
    '[Products API] Create Product Success',
    props<{ product: Product }>()
)

export const  createProductFailure = createAction(
    '[Products API] Create Product Failure',
    props<{ error: string }>()
)


export const  deleteProductSuccess = createAction(
    '[Products API] Delete Product Success',
    props<{ productId: number }>()
)

export const  deleteProductFailure = createAction(
    '[Products API] Delete Product Failure',
    props<{ error: string }>()
)
