import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Company } from 'src/app/_models/company.model';
import { Productitem } from 'src/app/_models/productitem.model';
import { Product } from 'src/app/_models/product.model';
import { Productpack } from 'src/app/_models/productpack.model';
import { Supplier } from 'src/app/_models/supplier.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CrudService } from 'src/app/_services/crud.service';
import { Purchase } from 'src/app/_models/purchase.model';
import { Resource } from 'src/app/_models/resource.model';

@Component({
  selector: 'app-productitem-edit',
  templateUrl: './productitem-edit.component.html',
  styleUrls: ['./productitem-edit.component.scss']
})
export class ProductitemEditComponent implements OnInit {

  productitem = new Productitem();
  isNewProductitem = true;
  allpos = ['Restau', 'Bar', 'Shop', 'Service', 'Personnalized'];
  company = new Company();

  suppliers = new Array<Supplier>();
  products = new Array<any>();
  productpacks = new Array<any>();
  purchases = new Array<Purchase>();
  purchasesProduct = new Array<Purchase>();
  productitems = new Array<Productitem>();

  quantityMax = Number.MAX_VALUE;

  maximum = Number.MAX_VALUE;
  resourcesUsed = new Array<any>();

  type = 'product';

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private productpackService: CrudService<Productpack>,
    private companyService: CrudService<Company>,
    private supplierService: CrudService<Supplier>,
    private productService: CrudService<Product>,
    private purchaseService: CrudService<Purchase>,
    private productitemService: CrudService<Productitem>
  ) {
    this.company = this.authService.user.company;
    if (this.company) {
      this.getCompany(this.company);
    }
  }

  ngOnInit(): void {
    if (this.company) {
      this.getCompany(this.company);
    }
    this.getResourcesItems();
    this.productpackService.getAll('productpack').then((data) => {
      this.productpacks = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
      this.supplierService.getAll('supplier').then((data) => {
        this.suppliers = data.filter((d) => {
          return d.company && d.company.id === this.company.id;
        });
        this.productService.getAll('product').then((data) => {
          this.products = data.filter((d) => {
            return d.company && d.company.id === this.company.id;
          });

          this.productitemService.getAll('productitem').then((data) => {
            this.productitems = data.filter((d) => {
              return d.company && d.company.id === this.company.id;
            });
            this.getResourceUsed();
          }).catch((e) => {
          });
        });
        this.company = this.authService.user.company;
        this.route.paramMap.subscribe((paramMap) => {
          const id = paramMap.get('id');
          if (id) {
            this.productitemService.get('productitem', id).then((data) => {
              this.productitem = data;
              if (data.productpack) {
                this.type = 'productpack';
              }
              this.isNewProductitem = false;
              this.suppliers.forEach((supplier) => {
                if (this.productitem.supplier && supplier.id === this.productitem.supplier.id) {
                  this.productitem.supplier = supplier;
                }
              });
              this.products.forEach((r) => {
                if (this.productitem.product && r.id === this.productitem.product.id) {
                  this.productitem.product = r;
                }
              });
              this.productpacks.forEach((r) => {
                if (this.productitem.productpack && r.id === this.productitem.productpack.id) {
                  this.productitem.productpack = r;
                }
              });
            });
          }
        });
      });
    });
  }

  getCompany(company: Company) {
    this.companyService.get('company', company.id).then((data) => {
      this.company = data;
    });
  }

  save() {
    this.productitem.company.id = this.authService.user.company.id;
    if (this.type === 'product') {
      this.productitem.productpack = undefined;
    }
    if (this.type === 'productpack') {
      this.productitem.product = undefined;
    }
    if (this.isNewProductitem) {
      this.productitemService.create('productitem', this.productitem).then((_id) => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['productitem', 'view', _id]);
      });
    } else {
      this.productitemService.modify('productitem', this.productitem.id, this.productitem).then(() => {
        this.notifierService.notify('success', "saved successfully");
        this.router.navigate(['productitem', 'view', this.productitem._id]);
      });
    }
  }

  getResourceUsed() {
    // Je veux décrémenter les items
    this.resourcesUsed = new Array<any>();
    this.productitems.forEach((pi) => {
      const quantite = pi.quantity;
      let resources = new Array<any>();
      if (pi.product) {
        // On récupère la dernière version du produit
        // const p = this.getStateProduct(pi.product);
        const p = pi.product;
        resources = p.resources;        
        resources.forEach((r) => {
          r.quantity *= quantite;
          r['idpi'] = pi.id;
          this.resourcesUsed.push(r);
        });
      }
    });
  }

  getStateProduct(product: Product): Product {
    this.products.forEach((p) => {
      if (p.id === product.id) {
        product = p;
      }
    });
    return product;
  }

  getResourcesItems() {
    this.purchaseService.getAll('purchase').then((data) => {
      this.purchases = data.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
    }).catch((e) => {
    });
  }

  getResourcesItemsOfProduct(product: Product) {
    this.quantityMax = Number.MAX_VALUE;
    this.purchasesProduct = new Array<Purchase>();
    product.resources.forEach((r) => {
      this.purchases.forEach((resourceItem) => {
        if (resourceItem.resource && resourceItem.resource.id === r.resource.id) {
          this.purchasesProduct.push(resourceItem);
        }
      });
    });
    product.resources.forEach((r) => {
      const q = (this.getTotalResourceItemByResource(r.resource) * r.resource.content - this.getTotalResourceItemSaleByResource(r.resource)) / r.quantity;
      this.quantityMax = this.quantityMax > q ? q : this.quantityMax;
      this.quantityMax = Math.floor(this.quantityMax);
    });
    if (this.productitem.productpack) {
      this.quantityMax = Math.floor(this.quantityMax / this.productitem.productpack.quantity);
    }
  }

  getTotalResourceItemByResource(r: Resource) {
    let total = 0;
    this.purchasesProduct.forEach((resourceItem) => {
      if (resourceItem.resource && resourceItem.resource.id === r.id) {
        total += resourceItem.quantity;
      }
    });
    return total;
  }

  getTotalResourceItemSaleByResource(r: Resource) {
    let total = 0;
    this.resourcesUsed.forEach((resourceItem) => {
      if (resourceItem.resource && resourceItem.resource.id === r.id) {
        total += resourceItem.quantity;
      }
    });
    return total;
  }

  setInfosOfProduct() {
    setTimeout(() => {
      if (this.productitem.product) {
        this.getResourcesItemsOfProduct(this.productitem.product);
        this.productitem.price = this.productitem.product.price * this.productitem.quantity;
      }
      if (this.productitem.productpack) {
        this.getResourcesItemsOfProduct(this.productitem.productpack.product);
        this.productitem.price = this.productitem.productpack.price * this.productitem.quantity;
      }
    }, 500);
  }

  resetProduct() {
    this.productitem.product = undefined;
  }

  resetProductPack() {
    this.productitem.productpack = undefined;
  }

}
