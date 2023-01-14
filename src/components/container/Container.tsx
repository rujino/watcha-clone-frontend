import Series from "../Series";
import { useQuery } from "@tanstack/react-query";
import { getGenreDramaSeries, getSeries } from "../../api";
import { ISeriesList } from "../../types";
import { Box, Spinner, Text, Container } from "@chakra-ui/react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Banner from "../Banner";

import "../../css/swiper.css";
import "../../css/navigation.css";

export default function Containers() {
  const { isLoading, data } = useQuery<ISeriesList[]>(["series"], getSeries);
  const { isLoading: dramLoading, data: dramaData } = useQuery<ISeriesList[]>(
    ["seriesDrama"],
    getGenreDramaSeries
  );
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
      {dramLoading ? (
        <Container size="xl">
          <Spinner />
        </Container>
      ) : (
        <>
          <Box color="white" display={"flex"} justifyContent="space-between">
            <Text fontSize={"25px"}>드라마</Text>
            <Text>더보기</Text>
          </Box>
          <Swiper
            slidesPerView={8}
            slidesPerGroup={8}
            modules={[Navigation]}
            navigation
          >
            {dramaData?.map((series, index) => (
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
