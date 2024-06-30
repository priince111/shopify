import React, { useEffect } from "react";
import AppNavbar from "./AppNavbar";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
} from "reactstrap";
import '../css_comp/Main.css'
import { useSelector, useDispatch } from "react-redux";
import { getproducts } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";
const HomePage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const items = useSelector((state) => state.productReducer.products);
  console.log('items are',items);
  const user = useSelector((state) => state.authReducer.user);

  useEffect(() => {
    dispatch(getproducts());
  }, [dispatch]);

  const onAddToCart = async (id, productId) => {
    console.log("id is the",id)
    await dispatch(addToCart(id, productId, 1));
    alert("Item added to Cart");
  };

  return (
    <div className="top-margin">
      <AppNavbar />
      <Container>
        <div className="row">
          {items.map((item) => (
            <div className="col-md-4" key={item._id}>
              <Card className="mb-4">
                <CardBody>
                  <CardTitle tag="h5">{item.title}</CardTitle>
                  <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                  <CardText>{item.category}</CardText>
                  {isAuthenticated && (
                    <Button
                      color="success"
                      size="sm"
                      onClick={() => onAddToCart(user.id, item._id)}
                    >
                      Add To Cart
                    </Button>
                  )}
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
