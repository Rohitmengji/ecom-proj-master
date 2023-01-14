
const { API } = require("../../backend");



export const getUserOrders = (userId, token) => {
    return fetch(`${API}/orders/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));

}
export const getOrderStaus = (orderId) => {
    return fetch(`${API}/order/status/${orderId}`, {
        method: "GET"

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}



