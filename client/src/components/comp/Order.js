import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppNavbar from "./AppNavbar";
import { getOrder } from "../../actions/orderActions";
import '../css_comp/Main.css'
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Alert,
  Container,
} from "reactstrap";

const Order = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orderReducer);
  console.log("orders is",orders);
  console.log("length",orders.length)
  const { isAuthenticated, user } = useSelector((state) => state.authReducer);
  useEffect(() => {
    if (isAuthenticated && user && !loaded) {
      dispatch(getOrder(user.id)).then(() => setLoaded(true));
    }
  }, [dispatch, isAuthenticated, user, loaded]);
  return (
    <div className="top-margin">
      <AppNavbar />
      {isAuthenticated ? (
        <Fragment>
          {orders && orders.length? null : (
            <Alert color="info" className="text-center">
              You have no orders!
            </Alert>
          )}
        </Fragment>
      ) : (
        <Alert color="danger" className="text-center">
          Login to View!
        </Alert>
      )}

      {isAuthenticated && !loading && loaded && orders && orders.length? (
        <Container>
          <div className="row">
            {orders.map((order) => (
              <div className="col-md-12" key={order._id}>
                <Card>
                  <CardBody>
                    <CardTitle tag="h4">
                      {order.products.length} items - Total cost: Rs. {order.bill}
                    </CardTitle>
                    <div className="row">
                      {order.products.map((item) => (
                        <div className="col-md-4" key={item.productId}>
                          <Card className="mb-2">
                            <CardBody>
                              <CardTitle tag="h5">
                                {item.name} ({item.quantity} pieces)
                              </CardTitle>
                              <CardSubtitle tag="h6">
                                Rs. {item.price}/piece
                              </CardSubtitle>
                            </CardBody>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
                <br />
              </div>
            ))}
          </div>
        </Container>
      ) : null}
    </div>
  );
};

export default Order;
