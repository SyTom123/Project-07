import { combineReducers } from "redux";
import AuthenReducer from "./authenReducers"
import Pagination from "./paginationReducer";
import CartReducer from "./cartReducer";
import ProductQuantity from './productQuantity';
import ReloadReducer from './reloadReducer';

 const AllReducers = combineReducers({
    AuthenReducer, Pagination, CartReducer, ProductQuantity, ReloadReducer
})

export default AllReducers;