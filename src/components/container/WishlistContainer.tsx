import Series from "../Series";
import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "../../api";
import { ISeriesList } from "../../types";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "../../css/swiper.css";
import "../../css/navigation.css";

interface wishlistVariables {
  series: ISeriesList[];
}

export default function WishlistContainer() {
  const { data: wishlistData } = useQuery<wishlistVariables[]>(
    ["wishlist"],
    getWishlist
  );
  return (
    <>
      <Swiper
        slidesPerView={8}
        slidesPerGroup={8}
        modules={[Navigation]}
        navigation
      >
        {wishlistData?.[0].series.map((series, index) => (
          <SwiperSlide>
            <Series
              key={index}
              id={series.id}
              title={series.title}
              genre={series.genre.genre_name}
              possible_age={series.possible_age}
              poster_url={series.poster_url}
              is_interested={series.is_interested}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
