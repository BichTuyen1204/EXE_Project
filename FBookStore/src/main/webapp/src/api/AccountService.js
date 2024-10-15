import axios from 'axios';

const API_BASE_URL = "http://localhost:8090/api/v1/account";

class AccountService {
    async getEntities (){
        try {
            const response = await axios.get(`${API_BASE_URL}/all`);
            return response.data
        }
        catch (error){
            console.error('Error update account: ', error);
        }
    }

    createAccount(account) {
        return axios.post(`${API_BASE_URL}/add`, account);
    }

    addComment(comment) {
        try {
            return axios.post(`${API_BASE_URL}/addComment`, comment);
        } catch (error) {
            console.error('Error add comment data: ', error);
        }
    }

    async updateAccount (account){
        try {
            return axios.put(`${API_BASE_URL}/update`, account);
        }
        catch (error){
            console.error('Error update account: ', error);
        }
    }

    async login(email, password, navigate) {
            const account = { email, password }
            const response = await axios.post(`${API_BASE_URL}/login`, account);
            const jwtToken = response.data; // Assume this is your JWT
            sessionStorage.setItem('jwtToken', jwtToken);
    }

    async getAccount(jwtToken) {
        try {
            const email = await axios.post(`${API_BASE_URL}/authenticate`, {}, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            try {
                const response = await axios.get(`${API_BASE_URL}/getAccount/${email.data}`);
                return response.data
            } catch (error) {
                console.error("ham tra ve gia tri: ", error)
            }
        } catch (error) {
            console.error('Ham login authen Error:', error);
            return
        }
    }

    async resetPassword(email, password) {

        const response = await axios.post(`${API_BASE_URL}/resetPassword`, {}, {
            params: {
                email,
                password
            }
        });
        console.log("ham get accout: ", response.data)
        return response;

    }

    async updatePassword(email, password, oldpassword) {
        const response = await axios.post(`${API_BASE_URL}/updatePassword`, {}, {
            params: {
                email,
                password,
                oldpassword
            }
        });
        console.log("ham get accout: ", response.data)
        return response;
    }

    async checkAccountExited(email) {
        try {
            const response = await axios.get(`${API_BASE_URL}/getAccount/${email}`);
            console.log("ham get accout: ", response.data)
            return true;
        } catch (error) {
            console.error("ham get accout error: ", error);
            return false;
        }
    }
}

export default new AccountService();
