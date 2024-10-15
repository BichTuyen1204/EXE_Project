import axios from 'axios';

const API_BASE_URL = "http://localhost:8090/api/v1/order";

class InvoiceService {

    async createInvoice(invoice) {
        try {
            const response = await axios.post(`${API_BASE_URL}/add`, invoice);
            console.log(response.data);
            return response.data
        } catch (error) {
            console.error('Error get cart data: ', error);
        }
    }

    async addBookToCart(idCart, idBook) {
        const quantity = 1;
        try {
            const response = await axios.post(`${API_BASE_URL}/addCartItem`, {}, {
                params: {
                    idCart,
                    idBook,
                    quantity
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error get cart data: ', error);
        }
    }

    async deletBookInCart(idCart, idBook) {
        try {
            const response = await axios.delete(`${API_BASE_URL}/deleteCartItem`, {
                params: {
                    idCart,
                    idBook
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error delete cart data: ', error);
        }
    }

    async getAllInvoice() {
        try {
            const response = await axios.get(`${API_BASE_URL}/getAllInvoice`)
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Don't have anything", error);
        }
    }

    async getInvoiceById(invoiceId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/getInvoiceById/${invoiceId}`)
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Don't have anything", error);
        }
    }

    async getInvoiceByEmail(email) {
        try {
            const response = await axios.get(`${API_BASE_URL}/getInvoiceByEmail/${email}`)
            console.log("invoice email", response.data);
            return response.data;
        } catch (error) {
            console.error("Don't have anything", error);
        }
    }
}

export default new InvoiceService();
