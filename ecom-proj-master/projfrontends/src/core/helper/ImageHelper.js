import React from 'react';
import { API } from '../../backend';

const ImageHelper = ({product}) =>{

     const imageUrl = product.image.slice(0,1).map(photo => photo.url);


    return  (
   <img
                src={imageUrl}
              alt="photo"
              style={{ maxHeight: "70%", maxWidth: "70%" }}
              className="side-product-image"
            />
    )
}

export default ImageHelper;

    