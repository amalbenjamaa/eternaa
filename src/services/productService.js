import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

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
            const response = await axios.get(`${API_BASE_URL}/products/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product ${id}:`, error);
            throw error;
        }
    }

    // Get products by category
    async getProductsByCategory(category) {
        try {
            const response = await axios.get(`${API_BASE_URL}/products/category/${category}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching products in category ${category}:`, error);
            throw error;
        }
    }

    // Get all categories
    async getCategories() {
        try {
            const response = await axios.get(`${API_BASE_URL}/products/categories`);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }

    // Get limited products (for pagination)
    async getLimitedProducts(limit = 10) {
        try {
            const response = await axios.get(`${API_BASE_URL}/products?limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching limited products:', error);
            throw error;
        }
    }

    // Sort products
    async getSortedProducts(sortType = 'asc') {
        try {
            const response = await axios.get(`${API_BASE_URL}/products?sort=${sortType}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching sorted products:', error);
            throw error;
        }
    }
}

export default new ProductService();