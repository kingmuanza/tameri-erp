import { Company } from "./company.model";
import { Resource } from "./resource.model";
import { Resourcepack } from "./resourcepack.model";
import { Supplier } from "./supplier.model";

export class Purchase {

    id: string = 'Purchase'.toUpperCase() + new Date().getTime();
    date = new Date()
    quantity = 0;
    price = 0;
    company = new Company();
    resource:Resource | undefined;
    resourcepack :Resourcepack | undefined;
    supplier: Supplier | undefined;

}