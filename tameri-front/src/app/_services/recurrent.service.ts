import { Injectable } from '@angular/core';
import { Company } from '../_models/company.model';
import { Inventory } from '../_models/inventory.model';
import { Productitem } from '../_models/productitem.model';
import { Resource } from '../_models/resource.model';
import { Resourceitem } from '../_models/resourceitem.model';
import { AuthenticationService } from './authentication.service';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class RecurrentService {

  resourceitems = new Array<Resourceitem>();
  productitems = new Array<Productitem>();
  inventories = new Array<Inventory>();
  resources = new Array<Resource>();
  
  company = new Company();

  constructor(    
    private authService: AuthenticationService,
    private resourceService: CrudService<Resource>,
    private productitemService: CrudService<Productitem>,
    private resourceitemService: CrudService<Resourceitem>,
    private inventoryService: CrudService<Inventory>,
  ) {    
    this.company = this.authService.user.company;
    this.init();
  }

  init() {       
    this.inventoryService.getAll('inventory').then((data) => {
      this.inventories = data.filter((i) => {
        return i.company && i.company.id === this.company.id;
      });
      this.productitemService.getAll('productitem').then((data) => {
        this.productitems = data.filter((p) => {
          return p.company && p.company.id === this.company.id;
        });
        this.resourceitemService.getAll('resourceitem').then((resourceitems) => {
          this.resourceitems = resourceitems.filter((d) => {
            return d.company && d.company.id === this.company.id && d.status && d.status === Resourceitem.CONFIRMED;;
          });
          this.resourceService.getAll('resource').then((data) => {
            this.resources = data.filter((d) => {
              return d.company && d.company.id === this.company.id;
            });
          });
        });
      });
    }); 
  }

  getNow(resource: Resource) {
    return this.getLastInventory(resource).quantity + this.getResourceItems(resource) - this.getProductItems(resource)
  }

  getLastInventory(resource: Resource): Inventory {
    let inventories = this.inventories.filter((d) => {            
      return d.resource && d.resource.id === resource.id;
    });
    if (inventories.length > 0) {
      inventories = inventories.sort((i1, i2)=> {
        return new Date(i1.date).getTime() - new Date(i2.date).getTime() > 0 ? -1: 1;
      });
      return inventories[0];
    } else {
      const inventory = new Inventory();
      inventory.resource = resource;
      return inventory;
    }
  }
  
  getResourceItems(resource: Resource) {
    const inventory = this.getLastInventory(resource);
    const date = new Date(inventory.date);

    const resourceitems = this.resourceitems.filter((d) => {
      const isRessource = d.resource?.id === resource.id;
      const isRessourcepack = d.resourcepack?.resource.id === resource.id;
      const isGoodDate = new Date(d.date).getTime() > date.getTime();
      return (isRessource || isRessourcepack) && isGoodDate;
    });
    const totalResourceitems = this.calculTotalResourceitems(resourceitems) * resource.content;
    return totalResourceitems
  }

  getProductItems(resource: Resource) {
    
    const inventory = this.getLastInventory(resource);
    const date = new Date(inventory.date);

    let totalItems = 0;
    this.productitems.forEach((d) => {
      if (new Date(d.date).getTime() > date.getTime()) {
        const product = d.product;
        const productpack = d.productpack;
        if (product) {
          product.resources.forEach((r) => {
            if (r.resource.id === resource.id) {
              totalItems += d.quantity * r.quantity;
            }
          });
        }
        if (productpack) {
          productpack.product.resources.forEach((r) => {
            if (r.resource.id === resource.id) {
              totalItems += d.quantity * r.quantity * productpack.quantity;
            }
          });
        }

      }
    });
    return totalItems;
  }

  calculTotalResourceitems(resourceitems: Array<Resourceitem>) {
    let total = 0;
    resourceitems.forEach((s) => {
      if (s.resource) {
        total += s.quantity;
      }
      if (s.resourcepack) {
        total += s.quantity * s.resourcepack.quantity;
      }
    });
    return total;
  }

}
