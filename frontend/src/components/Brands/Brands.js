import {useDispatch, useSelector} from "react-redux";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {brandActions} from "../../redux/slices";
import {useEffect} from "react";

import css from './Brands.module.css';

const Brands = () => {
    const {brands, error, loading} = useSelector(state => state.brandReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(brandActions.getAll());
    }, []);

    return (
        <div className={css.container}>
            {error && <span className={css.error}>{error.message}</span>}
            <h3>All brands</h3>
            {
                brands &&
                brands.map(brand => (
                    <div key={brand._id}>
                        {brand.name}
                        <button onClick={() => dispatch(brandActions.deleteById({brandId: brand._id}))}><HighlightOffIcon color='warning' fontSize='small'/></button>
                    </div>
                ))
            }
        </div>
    );
};

export {Brands};