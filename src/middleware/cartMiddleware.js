module.exports = (req, res, next) => {
   if (!req.session.cart) {
        req.session.cart = []; 
    }
    res.locals.cart = req.session.cart;
    res.locals.totalQuantity = req.session.cart.reduce((sum, i) => sum + i.quantity, 0);
    next();
};
