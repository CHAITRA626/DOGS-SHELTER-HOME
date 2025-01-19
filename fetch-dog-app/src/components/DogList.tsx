import React, { useState, useEffect } from 'react';
import { searchDogs } from '../api/apiService';
import DogCard from './DogCard';

const DogList: React.FC = () => {
  const [dogs, setDogs] = useState([]);
  const [breed, setBreed] = useState('');
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchDogs = async () => {
        try {
          const response = await searchDogs({ breeds: breed ? [breed] : [], size: 10, from: page * 10 });
          setDogs(response.data.resultIds);
        } catch (error) {
          console.error('Failed to fetch dogs', error);
        }
    };
    fetchDogs();
  }, [breed, page]);

  return (
    <div>
      <input type="text" placeholder="Filter by breed" value={breed} onChange={(e) => setBreed(e.target.value)} />
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      <div>{dogs.map((dogId) => <DogCard key={dogId} dogId={dogId} />)}</div>
    </div>
  );
};

export default DogList;
// import React from 'react';
// import DogCard from './DogCard';

// interface DogListProps {
//   dogs: Array<{
//     id: string;
//     name: string;
//     breed: string;
//     age: number;
//     img: string;
//     zip_code: string;
//   }>;
// }

// const DogList: React.FC<DogListProps> = ({ dogs }) => {
//   return (
//     <div className="dog-list">
//       {dogs.map((dog) => (
//         <DogCard key={dog.id} {...dog} />
//       ))}
//     </div>
//   );
// };

// export default DogList;
