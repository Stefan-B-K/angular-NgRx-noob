import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Product } from '../product';
import { DisplayMessage, GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';


@Component({
    selector: 'pm-product-edit',
    templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit, OnChanges {
    pageTitle = 'Product Edit';
    @Input() product!: Product | null
    @Input()  errorMessage!: string | null
    @Output() create= new EventEmitter<Product>()
    @Output() update = new EventEmitter<Product>()
    @Output() clear = new EventEmitter()
    @Output() delete= new EventEmitter<number>()

    productForm!: FormGroup;

    displayMessage: DisplayMessage= {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;


    constructor (private fb: FormBuilder) {

        this.validationMessages = {
            productName: {
                required: 'Product name is required.',
                minlength: 'Product name must be at least three characters.',
                maxlength: 'Product name cannot exceed 50 characters.'
            },
            productCode: {
                required: 'Product code is required.'
            },
            starRating: {
                range: 'Rate the product between 1 (lowest) and 5 (highest).'
            }
        };

        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit (): void {
        this.productForm = this.fb.group({
            productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            productCode: ['', Validators.required],
            starRating: ['', NumberValidators.range(1, 5)],
            description: ''
        });

        // Watch for value changes for validation
        this.productForm.valueChanges.subscribe(
            () => this.displayMessage = this.genericValidator.processMessages(this.productForm)
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        // patch form with value from the store
        if (changes['product']) {
            const product = changes['product'].currentValue as Product;
            this.displayProduct(product);
        }
    }

    blur (): void {
        this.displayMessage = this.genericValidator.processMessages(this.productForm);
    }

    displayProduct (product: Product | null): void {
        if (product) {
            this.productForm.reset();

            if (product.id === 0) {
                this.pageTitle = 'Add Product';
            } else {
                this.pageTitle = `Edit Product: ${product.productName}`;
            }

            this.productForm.patchValue({
                productName: product.productName,
                productCode: product.productCode,
                starRating: product.starRating,
                description: product.description
            });
        }
    }

    cancelEdit (product: Product): void {
        this.displayProduct(product);
    }

    deleteProduct (product: Product): void {
        if (product && product.id) {
            if (confirm(`Really delete the product: ${product.productName}?`)) {
                this.delete.emit(product.id )
            }
        } else {
            this.clear.emit()
        }
    }

    saveProduct (originalProduct: Product): void {
        if (this.productForm.valid) {
            if (this.productForm.dirty) {

                // Ensure values not on the form, such as the Id, are retained
                const product = { ...originalProduct, ...this.productForm.value } as Product;

                if (product.id === 0) {
                    this.create.emit(product)
                } else {
                    this.update.emit(product)
                }
            }
        }
    }

}
