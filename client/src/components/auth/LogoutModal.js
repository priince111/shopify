import React,{Fragment} from 'react'
import {
    Button,
    NavLink,
  } from "reactstrap";
  import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';

const LogoutModal = () => {
  const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };
  return (
    <div>
        <Fragment>
            <Button color="danger" className="btn btn-sm"><NavLink onClick={handleLogout} href="#"><span className="text-light"><b>Logout</b></span></NavLink></Button>
        </Fragment>
    </div>
  )
}

export default LogoutModal;
