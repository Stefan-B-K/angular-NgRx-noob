import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from "../product";


@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
    pageTitle = 'Products';

    @Input() products!: Product[] | null
    @Input() displayCode!: boolean | null
    @Input() selectedProduct!: Product | null
    @Input() errorMessage!: string | null
    @Output() toggleProdCode = new EventEmitter()
    @Output() newProduct = new EventEmitter()
    @Output() productSelected = new EventEmitter<Product>()

    onToggleProdCode (): void {
        this.toggleProdCode.emit()
    }

    onAddProduct (): void {
       this.newProduct.emit()
    }

    onProductSelect (product: Product): void {
        this.productSelected.emit(product)
    }
}
