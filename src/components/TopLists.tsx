import Carousel from './Carousel';
import { Restaurant } from '@/types/restaurant';
import RestaurantLogoCard from './RestaurantLogoCard';
import RestaurantCard from './RestaurantCard';

const TopLists = async ({ restaurants }: { restaurants: Restaurant[] }) => {
  const mostReviewedToShow = {
    sm: 1,
    md: 2,
    lg: 3,
  };

  const topRatedToShow = {
    sm: 3,
    md: 6,
    lg: 9,
  };

  const topRated = restaurants.filter((r) => r.averageRating > 4);
  const mostReviewed = restaurants.filter((r) => r.reviews.length > 2);

  const topRatedList = topRated.map((item) => (
    <RestaurantLogoCard key={item.id} item={item} />
  ));

  const mostReviewedList = mostReviewed.map((item) => (
    <RestaurantCard key={item.id} item={item} />
  ));

  return (
    <section className='w-max m-auto flex flex-col gap-10'>
      <Carousel
        title='Nuestros usuarios recomiendan'
        itemsToShowSizes={topRatedToShow}
        elementList={topRatedList}
        itemWidth={120}
      />
      <Carousel
        title='Lugares más reseñados'
        itemsToShowSizes={mostReviewedToShow}
        elementList={mostReviewedList}
        itemWidth={376}
      />
    </section>
  );
};

export default TopLists;
