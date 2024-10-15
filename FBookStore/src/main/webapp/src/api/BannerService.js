import axios from 'axios';

const API_BASE_URL = "http://localhost:8090/api/v1/banner";

class BannerService {
    async getAllBanner() {
        try {
            const response = await axios.get(`${API_BASE_URL}/getAll`);
            // console.log('API Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching data: ', error.response.data);
            // Xử lý lỗi hoặc trả về giá trị thích hợp
        }
    }

    async addNew(formData) {
        return await axios.post(`${API_BASE_URL}/addNew`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    
    deleteBanner (idBanner){
        return axios.delete(`${API_BASE_URL}/delete/${idBanner}`);
    }

    async checkBannerTypeExisted(type) {
        try {
            const response = await axios.get(`${API_BASE_URL}/getBanner/${type}`);
            console.log("ham get accout: ", response.data)
            return true;
        } catch (error) {
            console.error("ham get accout error: ", error);
            return false;
        }
    }


}
export default new BannerService();