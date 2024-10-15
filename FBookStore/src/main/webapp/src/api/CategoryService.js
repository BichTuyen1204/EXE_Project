import axios from "axios";

const API_BASE_URL = "http://localhost:8090/api/v1/category";

class CategoryService {
    async getAllCategory() {
        try {
            const response = await axios.get(`${API_BASE_URL}/getAll`);
            return response.data;
        } catch (error) {
            console.log("Lỗi ròi", error);
        }
    }

    async getAdd(name) {
        try {
            const response = await axios.post(`${API_BASE_URL}/add`, {name});
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log("Lỗi ròi", error);
        }
    }
    
    async delete(idCategory) {
            const response = await axios.delete(`${API_BASE_URL}/delete/${idCategory}`);
            console.log("Category detail", response);
            return response;
        
    }

    async getCategoryDetail(idCategory) {
        try {
            const response = await axios.get(`${API_BASE_URL}/getId/${idCategory}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    async update(category) {
        return await axios.put(`${API_BASE_URL}/update`, category)
    }
}

export default new CategoryService();