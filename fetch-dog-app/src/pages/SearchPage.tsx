import React from 'react';
import DogList from '../components/DogList';

const SearchPage: React.FC = () => (
  <div>
    <h1>Search Dogs</h1>
    <DogList />
  </div>
);

export default SearchPage;
// import React, { useState, useEffect } from 'react';
// import DogList from '../components/DogList';
// import Pagination from '../components/Pagination'
// import '../styles/DogCard.css'
// import '../styles/DogList.css'
// import '../styles/Pagination.css'

// const SearchPage: React.FC = () => {
//   const [dogs, setDogs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
  
//   useEffect(() => {
//     // Call API to fetch dogs based on pagination
//     fetch(`/dogs/search?page=${currentPage}&size=10`)
//       .then((res) => res.json())
//       .then((data) => {
//         setDogs(data.dogs);
//         setTotalPages(Math.ceil(data.total / 10));
//       });
//   }, [currentPage]);

//   return (
//     <div>
//       <DogList dogs={dogs} />
//       <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
//     </div>
//   );
// };

// export default SearchPage;
