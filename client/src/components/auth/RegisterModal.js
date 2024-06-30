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
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clear_error } from "../../actions/errorActions";

const RegisterModal = () => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.errorReducer);
  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
  useEffect(() => {
    if (error.id === "REGISTER_FAIL") {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }

    if (modal && isAuthenticated) {
      toggle();
    }
  }, [error, isAuthenticated, modal]);

  const toggle = () => {
    dispatch(clear_error());
    setModal(!modal);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = { name, email, password };

    dispatch(register(newUser));
  };

  return (
    <div className="container">
      <Button color="info" className="btn btn-sm">
        <NavLink onClick={toggle} href="#">
          <span className="text-dark">
            <b>Register</b>
          </span>
        </NavLink>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {msg && <Alert color="danger">{msg}</Alert>}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={onChange}
                value={name}
              />
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={onChange}
                value={email}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={onChange}
                value={password}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

export default RegisterModal;
