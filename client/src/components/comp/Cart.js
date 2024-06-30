import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppNavbar from "./AppNavbar";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Alert,
  Container,
} from "reactstrap";
import '../css_comp/Main.css'
import { getCart, deleteFromCart } from "../../actions/cartActions";
import Checkout from "./Checkout";
import { checkout } from "../../actions/orderActions";

const Cart = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const { cart, loading: cartLoading } = useSelector((state) => state.cartReducer);
  const { isAuthenticated, user } = useSelector((state) => state.authReducer);
  console.log("user the",user);
  console.log('cart is the',cart);
  console.log("is Authenticated hai", isAuthenticated);
  console.log("load",loaded)
  useEffect(() => {
    if (isAuthenticated && user && !loaded) {
      dispatch(getCart(user.id)).then(() => setLoaded(true));
    }
  }, [dispatch, isAuthenticated, user, loaded]);

  // Delete item from cart
  const onDeleteFromCart = (id, itemId) => {
    dispatch(deleteFromCart(id, itemId));
  };

  const onCheckoutSuccess = () =>{
    console.log("successful checkout")
    dispatch(getCart(user.id));
  }
  return (
    <div className="top-margin">
      <AppNavbar />
      {isAuthenticated ? (
        <Fragment>
          {!cart ? (
            <Alert color="info" className="text-center">
              Your cart is empty!
            </Alert>
          ) : null}
        </Fragment>
      ) : (
        <Alert color="danger" className="text-center">
          Login to View!
        </Alert>
      )}

      {isAuthenticated && !cartLoading && loaded && cart ? (
        <Container>
          <div className="row">
            {cart.products.map((item) => (
              <div className="col-md-4" key={item.productId}>
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">{item.name}</CardTitle>
                    <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                    <CardText>Quantity - {item.quantity}</CardText>
                    <Button
                      color="danger"
                      onClick={() => onDeleteFromCart(user.id, item.productId)}
                    >
                      Delete
                    </Button>
                  </CardBody>
                </Card>
                <br />
              </div>
            ))}
            <div className="col-md-12">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">Total Cost = Rs. {cart.bill}</CardTitle>
                  <Checkout
                    user={user.id}
                    amount={cart.bill}
                    checkout={(userId, tokenId) => {dispatch(checkout(user.id, tokenId)).then(onCheckoutSuccess)}}
                  />
                </CardBody>
              </Card>
            </div>
          </div>
        </Container>
      ) : null}
    </div>
  );
};

export default Cart;
