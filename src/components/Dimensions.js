import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Dimensions = () => {
    const dimensions = useSelector(state => state.dimensions);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        event.preventDefault();
        const id = event.target.id;
        const newDimensions = {
            width: id === 'width' ? event.target.value : dimensions.width,
            height: id === 'height' ? event.target.value : dimensions.height
        }
        dispatch({type: 'DIMENSION', payload: newDimensions});
    }
    return(
        <div>
            <div className="row">
                <div className="input-field col s6">
                    <input id="width" onChange={handleChange} type="text" value = {dimensions.width} className="validate"/>
                    <label className="active" htmlFor="width">Image Width(*Adjust width to resize your image.)</label>
                </div>
                <div className="input-field col s6">
                    <input id="height" onChange={handleChange} type="text" value = {dimensions.height} className="validate"/>
                    <label className="active" htmlFor="height">Image Height(*Adjust height to resize your image.)</label>
                </div>
            </div>
        </div>
    );
}

export default Dimensions;