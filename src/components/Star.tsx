'use client';

import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface StarProps {
  onSetRating: (rating: number) => void;
  size?: number;
  color?: string;
  emptyStarColor?: string;
  maxRating?: number;
  currentRating?: number;
}

interface StarIconProps {
  size: number;
  color: string;
  emptyStarColor: string;
  full: boolean;
}

const StarIcon = ({ size, color, emptyStarColor, full }: StarIconProps) => (
  <FaStar
    color={full ? color : emptyStarColor}
    style={{ fontSize: `${size}px` }}
  />
);

export default function Star({
  onSetRating,
  size = 30,
  color = '#F5D03A',
  emptyStarColor = '#A0A0A0',
  maxRating = 5,
  currentRating = 0,
}: StarProps) {
  const [rating, setRating] = useState<number>(currentRating);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  useEffect(() => {
    setRating(currentRating);
  }, [currentRating]);

  const handleRating = (i: number) => {
    const newRating = i + 1;
    setRating(newRating);
    onSetRating(newRating);
  };

  const stars = Array.from({ length: maxRating }, (_, i) => (
    <span
      key={i}
      role='button'
      onClick={() => handleRating(i)}
      onMouseEnter={() => setHoveredRating(i + 1)}
      onMouseLeave={() => setHoveredRating(0)}
    >
      <StarIcon
        size={size}
        color={color}
        emptyStarColor={emptyStarColor}
        full={hoveredRating > 0 ? hoveredRating >= i + 1 : rating >= i + 1}
      />
    </span>
  ));

  return <>{stars}</>;
}
