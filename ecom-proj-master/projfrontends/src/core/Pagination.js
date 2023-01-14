import React from 'react';
import "../scss/styles.scss"


const Pagination = ({productPerPage , totalProduct , paginate}) => {
    const pageNumber = []

    for (let i = 1; i <= Math.ceil(totalProduct / productPerPage); i++) {
       pageNumber.push(i)
        
    }

    return (
      
            <div className="ppagination">
            <ul className="ppagination-list">
                {pageNumber.map(number => {
                 return   <li onClick={() => paginate(number)} className="ppagination-list-item" key={number}>
                        <a   className="ppagination-list-item-link">{number}</a>
                    </li>
                })}
            </ul>
            </div>
        
    )
}

export default Pagination