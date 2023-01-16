import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from '../product';
import { ProductService } from '../product.services';

@Component({
  selector: 'pm-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  pageTitle: string = "Product Detail";
  product : IProduct | undefined;
  sub!: Subscription;

  constructor(private route: ActivatedRoute, private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += ` : + ${id}`;

    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.product = products.find((product: IProduct) =>
        product.productId === id);
      }
    })
    
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
