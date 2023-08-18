import { environment } from "src/environments/environment";

export const DomainName = environment.production ? 'https://mydomain.com' : 'https://localhost:5001';
export const ImagePath= DomainName+"/images/products/origin/";
export const ImagePathProductGallery= DomainName+"/images/product-galleries/";