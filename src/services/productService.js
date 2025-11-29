import axios from 'axios';

const API_BASE_URL = 'https://my-json-server.typicode.com/amalbenjamaa/eternaa';

class ProductService {
    // Get all products
    async getAllProducts() {
        try {
            const response = await axios.get(`${API_BASE_URL}/products`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    // Get single product by ID
    async getProductById(id) {
        try {
            // Ensure ID is a number for JSON Server
            const productId = parseInt(id, 10);
            if (isNaN(productId)) {
                throw new Error(`Invalid product ID: ${id}`);
            }
            const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product ${id}:`, error);
            throw error;
        }
    }

    // Get products by category
    async getProductsByCategory(category) {
        try {
            const response = await axios.get(`${API_BASE_URL}/products?category=${encodeURIComponent(category)}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching products in category ${category}:`, error);
            throw error;
        }
    }

    // Get all categories
    async getCategories() {
        try {
            const response = await axios.get(`${API_BASE_URL}/categories`);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }

    // Get limited products (for pagination)
    async getLimitedProducts(limit = 10) {
        try {
            const response = await axios.get(`${API_BASE_URL}/products?_limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching limited products:', error);
            throw error;
        }
    }

    // Sort products
    async getSortedProducts(sortType = 'asc') {
        try {
            const response = await axios.get(`${API_BASE_URL}/products?_sort=price&_order=${sortType}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching sorted products:', error);
            throw error;
        }
    }
}

export default new ProductService();