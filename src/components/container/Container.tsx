import Series from "../Series";
import { ISeriesList } from "../../types";
import { Box, Spinner, Text, Container } from "@chakra-ui/react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Banner from "../Banner";

import "../../css/swiper.css";
import "../../css/navigation.css";

interface Idata {
  isLoading: boolean;
  data: ISeriesList[] | undefined;
}

export default function Containers({ isLoading, data }: Idata) {
  return (
    <>
      <Banner></Banner>
      {isLoading ? (
        <Container size="xl">
          <Spinner />
        </Container>
      ) : (
        <>
          <Box color="white" display={"flex"} justifyContent="space-between">
            <Text fontSize={"25px"}>새로운 에피소드</Text>
            <Text>더보기</Text>
          </Box>
          <Swiper
            slidesPerView={8}
            slidesPerGroup={8}
            modules={[Navigation]}
            navigation
          >
            {data?.map((series, index) => (
              <SwiperSlide key={index}>
                <Series
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
      )}
    </>
  );
}
