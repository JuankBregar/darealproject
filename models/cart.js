module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = ({ _id, name, final_price }, qty) => {
        if (!this.items[name]) {
            this.items[name] = { _id: _id, name: name, price: final_price, qty: qty }
        } else {
            this.item[name].qty += qty;
        }
        this.totalQty += Number(qty);
        this.totalPrice += Number(final_price) * Number(qty);
    }


    this.toArray = () => {
        let arr = [];
        for (let name in this.items) {
            arr.push(this.items[name]);
        }
        return arr;
    }
}