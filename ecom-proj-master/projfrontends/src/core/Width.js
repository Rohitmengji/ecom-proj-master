import React from 'react';
import { isAutheticated } from '../auth/helper';

const Width = () => {
    if(!isAutheticated()){
       return 190 + 'px'
    }
}

export default Width