import React, { useState } from 'react'
import Star from './Star';

const StarRating = ({onRatingSelected}) => {
    const [rating, setRating] = useState(0);
    const handleClick = (newRating) => {
        setRating(newRating);
        onRatingSelected(newRating);
      };
  return (
    <div>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        filled={star <= rating}
        onClick={() => handleClick(star)}
      />
    ))}
  </div>
  )
}

export default StarRating
