import axios from 'axios';
import { error } from 'jquery';

const API_BASE_URL = "http://localhost:8090/api/v1/product";

class ProductService {

    async getAllProducts(currentPage) {
            const response = await axios.get(`${API_BASE_URL}/getAllProducts/${currentPage}`);
            return response.data;
    }

    async getAllProductsAdmin() { 
            const response = await axios.get(`${API_BASE_URL}/getAllProductsAdmin`);
            return response.data;
    }

    async getProductDetail(idBook) {
        try {
            const response = await axios.get(`${API_BASE_URL}/getProduct/${idBook}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    async addNew(formData) {
        return await axios.post(`${API_BASE_URL}/addNew`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    async update(product) {
        return await axios.put(`${API_BASE_URL}/update`, product)
    }

    async updateImage(formData) {
        return await axios.put(`${API_BASE_URL}/updateImageProduct`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    async deleteProduct(idBook) {
        const status = "deleted"
        const formData = new FormData();
        formData.append('idBook', idBook)
        formData.append('status', status)
        return await axios.put(`${API_BASE_URL}/deleteProduct`, formData)
    }

    async getNameCategory(idCategory, pageNumber) {
        try {
            const response = await axios.get(`${API_BASE_URL}/products/category`, {
                params: {
                    idCategory,
                    pageNumber
                }
            });
            return response.data;
        } catch (error) {
            console.log("Error", error);
        }
    }

    async getProductsbyCategoryException(idCategory, pageNumber, idBook) {
        try {
            const response = await axios.get(`${API_BASE_URL}/products/categoryexception`, {
                params: {
                    idCategory,
                    pageNumber,
                    idBook
                }
            });
            return response.data;
        } catch (error) {
            console.log("Error", error);
        }
    }

    async searchProduct(keyword, pageNumber) {
        try {
            const response = await axios.get(`${API_BASE_URL}/search`, {
                params: {
                    keyword,
                    pageNumber
                }
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log("Error", error);
        }
    }
}

export default new ProductService();
