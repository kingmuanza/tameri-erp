import { Warehouse } from "./warehouse.model";

export class Warehouseblock {
    
    id: string = 'WAREHOUSEBLOCK' + new Date().getTime();
    _id: any;
    name: string = '';
    position: string = '';
    surface = 0;
    description: string = '';
    warehouse = new Warehouse();
    
}