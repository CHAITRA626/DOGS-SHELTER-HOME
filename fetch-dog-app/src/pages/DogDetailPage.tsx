import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/DogDetailPage.css';

const DogDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dog = location.state?.dog;

  if (!dog) {
    return <p>No dog data available</p>;
  }

  return (
    <div className="dog-details">
        <div className='dog-details-wrapper'>
            <img src={dog.img} alt={dog.name} />
            <div className="details">
                <h1>My Name is {dog.name}!</h1>
                <div><strong> {dog.breed} </strong> | <strong> {dog.age} years old </strong> | <strong> {dog.zip_code} </strong> </div>
                <h3>About me</h3>
                <p>Hello there! I’m so happy you’re taking the time to get to know me. I’m a friendly, affectionate dog who loves being around people. Whether we’re out for a walk or just hanging out at home, I’m always up for some fun and snuggles. I’ve got a big heart and am ready to share it with a family who will love me back just as much as I’ll love them.</p>

                <p>I might be a little shy at first, but once I warm up, you’ll see that I’m a playful and loyal companion. I’m good with kids, and I promise to be gentle with them. I enjoy being around my humans, and I’m always ready to join in whatever activities you have in mind. I might even be your new best friend for movie nights or outdoor adventures!</p>

                <p>I may need a little patience while I adjust to new surroundings, but trust me, it’s worth it! I’m a quick learner and love to please, so you can teach me new tricks and commands, and I’ll do my best to make you proud. I just want to be by your side, whether we’re going for a walk, playing, or even just relaxing on the couch.</p>

                <p>If you’re looking for a dog who will stick by you through thick and thin, I’m your dog! I’m excited to meet you and start our new adventure together. I promise to fill your life with joy, love, and plenty of tail wags. So, are you ready to adopt me? I can’t wait to call you my family!</p>
            </div>
        </div>
        <p>
        <strong>Meet the Adoption Criteria - </strong>Before you do anything else, make sure you meet our adoption criteria. You must be at least 21 years old. You must share veterinary records for all pets currently in your home and all pets owned in the last five years. All pets in the home must be spayed or neutered. If you rent your home, you must provide verification that pets are allowed on the property. You must be willing to be interviewed by an adoption counselor and you must undergo a home visit from an RHS representative.</p>


        <p>
        <strong>Home Visit - </strong> If all the steps above are completed satisfactorily, we will set up a home visit where you can meet the pet you are interested in again and the pet can meet other pets in the family. We will try to send the foster parent so you can learn more about how the pet is in a home environment.</p>

        <p>
        <strong>Complete Adoption - </strong>If all feel it is a good match, we will schedule the adoption. The applicant will need to complete the adoption contract and pay the adoption fee. Our adoption fee is $250 for adult dogs and $300 for puppies (under 1 year). Discounts are available for senior-aged pets.
        </p>
      <button onClick={() => navigate(`/adopt/${dog.id}`, { state: { dog } })}>Fetch me</button>
    </div>
  );
};

export default DogDetails;
