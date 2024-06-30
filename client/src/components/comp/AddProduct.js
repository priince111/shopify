import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Alert,
} from "reactstrap";
import '../css_comp/Main.css'
import { useDispatch, useSelector } from "react-redux";
import { addproduct } from "../../actions/productActions";
import AppNavbar from "./AppNavbar";


const AddProduct = () => {
  const [formData,setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
  const dispatch = useDispatch();
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      price: formData.price,
    };
    await dispatch(addproduct(newItem));
    alert("ítem added succesfully");
  };
  return (
    <div className="top-margin">
      <AppNavbar />
      <Container>
        <h2 className="text-center mb-3">Add a new Item</h2>
        {isAuthenticated ? (
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Title of the item"
                onChange={onChange}
                value={formData.title}
              />
              <br />
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                placeholder="Description of the item"
                onChange={onChange}
                value={formData.description}
              />
              <br />
              <Label for="category">Category</Label>
              <Input
                type="text"
                name="category"
                id="category"
                placeholder="Category of the item"
                onChange={onChange}
                value={formData.category}
              />
              <br />
              <Label for="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                placeholder="Price of the item"
                onChange={onChange}
                value={formData.price}
              />

              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        ) : (
          <Alert className="text-center" color="danger">
            Login to add items!
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default AddProduct;
