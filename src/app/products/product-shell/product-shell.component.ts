import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { Product } from '../product';
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from "../state";

import { ProductPageActions } from "../state/actions"

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

    products$!: Observable<Product[]>;
    displayCode$!: Observable<boolean>;
    selectedProduct$!: Observable<Product | null>;
    errorMessage$!: Observable<string>;

    constructor (private store: Store<State>) { }

    ngOnInit (): void {
        this.store.dispatch(ProductPageActions.loadProducts())

        this.products$ = this.store.select(getProducts)
        this.displayCode$ = this.store.select(getShowProductCode)
        this.selectedProduct$ = this.store.select(getCurrentProduct)
        this.errorMessage$ = this.store.select(getError)
    }

    toggleProdCode (): void {
        this.store.dispatch(ProductPageActions.toggleProductCode())
    }

    newProduct (): void {
        this.store.dispatch(ProductPageActions.initializeCurrentProduct())
    }

    productSelected (product: Product): void {
        this.store.dispatch(ProductPageActions.setCurrentProduct({ currentProductId: product.id! }));
    }


    createProduct (product: Product) {
        this.store.dispatch(ProductPageActions.createProduct({ product }))
    }

    updateProduct (product: Product) {
        this.store.dispatch(ProductPageActions.updateProduct({ product }))
    }

    deleteProduct (productId: number) {
        this.store.dispatch(ProductPageActions.deleteProduct({ productId }))
    }

    clearCurrentProduct () {
        this.store.dispatch(ProductPageActions.clearCurrentProduct());
    }

}
