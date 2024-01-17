//import React from "react";

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//     const pages = Array.from({ length: totalPages }, (index) => index + 1);

//     return (
//         <div>
//             <button onClick={() => onPageChange("first")}>{"<<"}</button>
//             <button onClick={() => onPageChange("prev")}>{"<"}</button>
//             {pages.map((page) => (
//                 <button 
//                 key={page} 
//                 onClick={() => onPageChange(page)}
//                 className={currentPage === page ? "active" : ""}
//                 >
//                     {page}
//                 </button>
//             ))}
//             <button onClick={() => onPageChange("next")}>{">"}</button>
//             <button onClick={() => onPageChange("last")}>{">>"}</button>
//         </div>
//     )
// };

//export default Pagination;