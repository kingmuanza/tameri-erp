import { Injectable } from '@angular/core';
import { Company } from '../_models/company.model';
import { Inventory } from '../_models/inventory.model';
import { Productitem } from '../_models/productitem.model';
import { Resource } from '../_models/resource.model';
import { Resourceitem } from '../_models/resourceitem.model';
import { AuthenticationService } from './authentication.service';
import { CrudService } from './crud.service';
import { Order } from '../_models/order.model';
import { Sale } from '../_models/sale.model';
import { Orderline } from '../_models/orderline.model';
import { Resourceused } from '../_models/resourceused.model';
import { Warehouse } from '../_models/warehouse.model';
import { Warehouseblock } from '../_models/warehouseblock.model';

@Injectable({
  providedIn: 'root'
})
export class RecurrentService {

  resourceitems = new Array<Resourceitem>();
  productitems = new Array<Productitem>();
  inventories = new Array<Inventory>();
  resources = new Array<Resource>();
  resourcesused = new Array<Resourceused>();
  warehouseblocks = new Array<Warehouseblock>();
  
  invoices = new Array<Sale>();

  company = new Company();

  constructor(
    private authService: AuthenticationService,
    private orderService: CrudService<Order>,
    private invoiceService: CrudService<Sale>,
    private resourceService: CrudService<Resource>,
    private productitemService: CrudService<Productitem>,
    private resourceitemService: CrudService<Resourceitem>,
    private inventoryService: CrudService<Inventory>,
    private resourceusedService: CrudService<Resourceused>,
    private warehouseblockService: CrudService<Warehouseblock>
  ) {
    this.company = this.authService.user.company;
    this.init();
  }

  isOrderPaid(order: Order) {
    if (!order.reduction) {
      order.reduction = 0;
    }

    const invoices = this.invoices.filter((d) => {
      return d.order && d.order._id === order._id;
    });
    const amountReceived = this.getAmountReceived(invoices);

    let TOTAL = 0;
    TOTAL = 0;
    order.orderlines.forEach((orderline) => {
      TOTAL += this.getTotal(orderline);
    });
    const isPaid = TOTAL - order.reduction - amountReceived === 0
    return isPaid;
  }

  getTotal(orderline: Orderline): number {
    return orderline.productpack.price * orderline.quantity;
  }


  getAmountReceived(invoices: Sale[]): number {
    let resultat = 0;
    invoices.forEach((sale) => {
      resultat += sale.paid;
    });
    return resultat;
  }


  init() {
    this.invoiceService.getAll('bill').then((invoices) => {
      this.invoices = invoices.filter((d) => {
        return d.company && d.company.id === this.company.id;
      });
    });
    this.resourceusedService.getAll('resourceused').then((resourcesused) => {
      this.resourcesused = resourcesused.filter((m) => {
        return m.company && m.company.id === this.company.id;
      });
    });
    this.warehouseblockService.getAll('warehouseblock').then((warehouseblocks) => {
      this.warehouseblocks = warehouseblocks.filter((wb) => {
        return wb.warehouse.company && wb.warehouse.company.id === this.company.id;
      });
    });
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
      inventories = inventories.sort((i1, i2) => {
        return new Date(i1.date).getTime() - new Date(i2.date).getTime() > 0 ? -1 : 1;
      });
      return inventories[0];
    } else {
      const inventory = new Inventory();
      inventory.resource = resource;
      return inventory;
    }
  }

  getLastResourceused(resource: Resource): Resourceused {
    let resourcesused = this.resourcesused.filter((d) => {
      return d.resource && d.resource.id === resource.id;
    });

    if (resourcesused.length > 0) {
      resourcesused = resourcesused.sort((i1, i2) => {
        return new Date(i1.date).getTime() - new Date(i2.date).getTime() > 0 ? -1 : 1;
      });
      return resourcesused[0];
    } else {
      const resourceused = new Resourceused();
      resourceused.resource = resource;
      return resourceused;
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

  getResourceUsedItems(resource: Resource) {
    const resourcesused = new Array(this.getLastResourceused(resource));
    //const date = new Date(resourcesused.date);

    const totalResourceitems = this.calculTotalResourcesUsed(resourcesused) ;
    return totalResourceitems;
  }

  getResourceItemsNoInventory(resource: Resource) {
    const resourceitems = this.resourceitems.filter((d) => {
      const isRessource = d.resource?.id === resource.id;
      const isRessourcepack = d.resourcepack?.resource.id === resource.id;
      return (isRessource || isRessourcepack);
    });
    const totalResourceitems = this.calculTotalResourceitems(resourceitems) * resource.content;
    return totalResourceitems
  }

  getResourceItemsNoInventoryValidated(resource: Resource) {
    const resourceitems = this.resourceitems.filter((d) => {
      const isRessource = d.resource?.id === resource.id;
      const isRessourcepack = d.resourcepack?.resource.id === resource.id;
      return (isRessource || isRessourcepack) && d.status && d.status === Resourceitem.CONFIRMED;
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

  calculTotalResourcesUsed(resourcesused: Array<Resourceused>) {
    let total = 0;
    resourcesused.forEach((s) => {
      if (s.resource) {
        total += s.quantity;
      }
    });
    return total;
  }

  getBlocks(warehouse: Warehouse) {
    const blocks = this.warehouseblocks.filter((wb) => {
      return wb.warehouse.id === warehouse.id;
    });

    return blocks;
  }

}
