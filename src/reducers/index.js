import  { combineReducers } from 'redux';
import showLoading from './showLoading';
import responseData from './responseData';
import showForm from './showForm';
import setDimensions from './setDimensions';

export default combineReducers({
    showLoadingState: showLoading,
    data: responseData,
    showForm: showForm,
    dimensions: setDimensions
});