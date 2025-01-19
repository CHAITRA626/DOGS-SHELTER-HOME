import React, { useEffect, useState } from 'react';
import { getDogsByIds } from '../api/apiService';

interface Dog {
  img: string;
  name: string;
  breed: string;
  age: number;
}

const DogCard: React.FC<{ dogId: string }> = ({ dogId }) => {
  const [dog, setDog] = useState<Dog | null>(null);



  useEffect(() => {
    const fetchDog = async () => {
        try {
          const response = await getDogsByIds([dogId]);
          setDog(response.data[0]);
        } catch (error) {
          console.error('Failed to fetch dog details', error);
        }
    };
    fetchDog();
  }, [dogId]);

  return (
    <div>
      {dog && (
        <div>
          <img src={dog.img} alt={dog.name} />
          <h3>{dog.name}</h3>
          <p>Breed: {dog.breed}</p>
          <p>Age: {dog.age}</p>
        </div>
      )}
    </div>
  );
};

export default DogCard;
// import React from 'react';

// interface DogCardProps {
//   id: string;
//   name: string;
//   breed: string;
//   age: number;
//   img: string;
//   zip_code: string;
// }

// const DogCard: React.FC<DogCardProps> = ({ id, name, breed, age, img, zip_code }) => {
//   return (
//     <div className="dog-card">
//       <img src={img} alt={name} />
//       <h3>{name}</h3>
//       <p>Breed: {breed}</p>
//       <p>Age: {age}</p>
//       <p>Location: {zip_code}</p>
//     </div>
//   );
// };

// export default DogCard;
