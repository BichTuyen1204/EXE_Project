import axios from 'axios';

const API_BASE_URL = "http://localhost:8090/api/v1/cart";

class CartServices {



    async getCart(accountEmail) {
        try {
            const response = await axios.get(`${API_BASE_URL}/getCart/${accountEmail}`);
            return response.data;
        } catch (error) {
            console.error('Error get cart data: ', error);
        }
    }

    async getBookInCart(accountEmail) {
        try {
            const response = await axios.get(`${API_BASE_URL}/getBookInCart/${accountEmail}`);
            console.log("product duoc load len: ", response.data)
            return response.data;
        } catch (error) {
            console.error('Error get cart data: ', error);
        }
    }

    // addNew(title, image, place_production, type, description) {
    //     const book = {title, image, place_production, type, description}
    //     return axios.post(`${API_BASE_URL}/addNew`, book);
    // }

    async addBookToCart(idCart, idBook) {
        const quantity = 1
        // try {
            const response = await axios.post(`${API_BASE_URL}/addCartItem`, {}, {
                params: {
                    idCart,
                    idBook,
                    quantity
                }
            });
            console.log(response);
            return response;
        // } catch (error) {
            
        //     return error.response.data;
        // }
    }

    async updateBookInCart(idCart, idBook, quantity) {
        
            const response = await axios.post(`${API_BASE_URL}/updateCartItem`, {}, {
                params: {
                    idCart,
                    idBook,
                    quantity
                }
            });
            console.log("result update: ", response.data);
            return response.data;
        
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

}

export default new CartServices();
