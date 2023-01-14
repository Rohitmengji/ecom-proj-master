const total = (products) => {
    let amount = 0
            products.forEach(product => {
                amount += product.price  * product.count
            });
           
            return amount
}

export default total