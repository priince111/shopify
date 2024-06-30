import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../actions/authActions";
import { clear_error } from "../../actions/errorActions";

const LoginModal = () => {
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.errorReducer);
  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);

  useEffect(() => {
    if (error.id === "LOGIN_FAIL") {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
    if (modal && isAuthenticated) {
      toggle();
  }
  }, [error,isAuthenticated,modal]);

  const toggle = () => {
    dispatch(clear_error());
    setModal(!modal);
  };

  const onChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  
  
  const onSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(login(user));
  };
  return (
    <div className="container">
      <Button color="success" className="btn btn-sm">
        <NavLink onClick={toggle} href="#">
          <span className="text-dark">
            <b>Login</b>
          </span>
        </NavLink>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={onChange}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};


export default LoginModal
