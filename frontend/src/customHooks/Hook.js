import { useContext } from 'react';
import { Context } from '../context/Context';

const useCustomContext = () => {
    return useContext(Context);
}

export default useCustomContext;