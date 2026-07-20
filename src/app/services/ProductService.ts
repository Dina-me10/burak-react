import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/product";

class ProductService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

 public async getProducts(input: ProductInquiry): Promise<Product[]> {
    try {
      // 1. URLni shakllantiring
     let url = `http://localhost:3003/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
      
      if (input.productCollection) {
        url += `&productCollection=${input.productCollection}`;
      }
      
      if (input.search) {
        url += `&search=${input.search}`;
      }

      console.log("URINILAYOTGAN URL:", url);

      // 2. Agar axios.get(url) 404 beryotgan bo'lsa, 
      // demak 'this.path' ichida 'http://localhost:3003' to'liq yozilmagan.
      // Agar 'this.path' to'g'ri bo'lsa, pastdagi qator ishlaydi:
      const result = await axios.get(url); 
      
      return result.data;
    } catch (err) {
      console.log("Error, getProduct:", err);
      throw err;
    }
}
}

export default ProductService;