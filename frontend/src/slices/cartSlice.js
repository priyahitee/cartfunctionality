import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // Checking that if Same product is added to the cart
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id)

            if (itemIndex >= 0) {
                state.cartItems[itemIndex] = {
                    ...state.cartItems[itemIndex],
                    cartQuantity: state.cartItems[itemIndex].cartQuantity + 1
                }
                toast.info(`${state.cartItems[itemIndex].name} Added to the cart`, {
                    position: "bottom-left",
                });
            } else {
                let tempProductItem = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProductItem);
                toast.success(`${action.payload.name} added to the cart`, {
                    position: "bottom-left",
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        decreaseCart: (state, action) => {
            // Checking that if Same product is added to the cart
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id)

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;

                toast.info("Decreased product quantity", {
                    position: "bottom-left",
                });
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const remainingCartItems = state.cartItems.filter(
                    (item) => item.id !== action.payload.id
                );

                state.cartItems = remainingCartItems;

                toast.error("Product removed from cart", {
                    position: "bottom-left",
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
             state.cartItems.map((cartItem) => {
                if (cartItem.id === action.payload.id) {
                    const remainingCartItems= state.cartItems.filter(
                        (item) => item.id !== cartItem.id
                    );
                    state.cartItems = remainingCartItems;
                    toast.error("Product removed from cart", {
                        position: "bottom-left",
                      });
                }
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
                return state;
            })
           
        },
        clearCart : (state) => {
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            toast.error("Cart cleared", { position: "bottom-left" });
        },
        getTotals : (state) => {
            let {total, quantity} = state.cartItems.reduce((cartTotal, cartItem) => {
                const {price, cartQuantity} = cartItem;
                const totalAmount = cartQuantity * price;
                cartTotal.total += totalAmount;
                cartTotal.quantity += cartQuantity;
                return cartTotal;
            }, {
                total: 0,
                quantity: 0
            });
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        
        }
    }
})

export const { addToCart, decreaseCart, removeFromCart, clearCart, getTotals } = cartSlice.actions;


export default cartSlice.reducer;