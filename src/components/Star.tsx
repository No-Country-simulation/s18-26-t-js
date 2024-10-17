'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

  /////////////////////////

  const handleHoverIn = (i: number) => setHoveredRating(i + 1);
  const handleHoverOut = () => setHoveredRating(0);

  const handleRating = useCallback(
    (i: number) => {
      const newRating = i + 1;
      setRating(newRating);
      onSetRating(newRating);
    },
    [onSetRating],
  );

  /////////////////////////

  const stars = useMemo(() => {
    return Array.from({ length: maxRating }, (_, i) => (
      <span
        key={i}
        role='button'
        onClick={() => handleRating(i)}
        onMouseEnter={() => handleHoverIn(i)}
        onMouseLeave={handleHoverOut}
      >
        <StarIcon
          size={size}
          color={color}
          emptyStarColor={emptyStarColor}
          full={hoveredRating > 0 ? hoveredRating >= i + 1 : rating >= i + 1}
        />
      </span>
    ));
  }, [
    size,
    color,
    emptyStarColor,
    rating,
    maxRating,
    hoveredRating,
    handleRating,
  ]);

  useEffect(() => {
    setRating(currentRating);
  }, [currentRating]);

  /////////////////////////

  return <React.Fragment>{stars}</React.Fragment>;
}

function StarIcon({ size, color, emptyStarColor, full }: StarIconProps) {
  return (
    <React.Fragment>
      {full ? (
        <FaStar color={color} style={{ fontSize: `${size}px` }} />
      ) : (
        <FaStar color={emptyStarColor} style={{ fontSize: `${size}px` }} />
      )}
    </React.Fragment>
  );
}
