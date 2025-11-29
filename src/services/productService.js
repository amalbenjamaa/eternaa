import axios from 'axios';

const API_BASE_URL = 'https://my-json-server.typicode.com/amalbenjamaa/eternaa';

class ProductService {
    // Get all products
    async getAllProducts() {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data;
    }

    // Get single product by ID
    async getProductById(id) {
        // Ensure ID is a number for JSON Server
        const productId = parseInt(id, 10);
        if (isNaN(productId)) {
            throw new Error(`Invalid product ID: ${id}`);
        }
        const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
        return response.data;
    }

    // Get products by category
    async getProductsByCategory(category) {
        const response = await axios.get(`${API_BASE_URL}/products?category=${encodeURIComponent(category)}`);
        return response.data;
    }

    // Get all categories
    async getCategories() {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        return response.data;
    }

    // Get limited products (for pagination)
    async getLimitedProducts(limit = 10) {
        const response = await axios.get(`${API_BASE_URL}/products?_limit=${limit}`);
        return response.data;
    }

    // Sort products
    async getSortedProducts(sortType = 'asc') {
        const response = await axios.get(`${API_BASE_URL}/products?_sort=price&_order=${sortType}`);
        return response.data;
    }
}

export default new ProductService();