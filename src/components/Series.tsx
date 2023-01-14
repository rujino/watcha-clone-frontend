import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaPlayCircle, FaPlusCircle } from "react-icons/fa";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  countPlayCount,
  getSeriesDetail,
  getWishlist,
  plusToggle,
} from "../api";
import { ISeriesDetail, IWishlist } from "../types";
import { useState } from "react";

const CardVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
  },
};

const InfoVariants = {
  hover: {
    opacity: 1,
  },
};

const brightVariants = {
  hover: {
    opacity: 1,
  },
};

const Card = styled(motion.div)<{ bgPhotos: string }>`
  width: 190px;
  height: 280px;
  background-color: gray;
  margin-top: 15px;
  margin-bottom: 15px;
  background-image: url(${(props) => props.bgPhotos});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  position: relative;
`;

const Info = styled(motion.div)`
  padding: 20px;
  opacity: 0;
  bottom: 0;
  position: absolute;
  width: 100%;
  z-index: 5000;
`;

const BrightBox = styled(motion.div)<{ bgPhotos: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgPhotos});
  background-color: black;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  filter: brightness(50%);
  opacity: 0;
  position: absolute;
`;

export interface ISeriesTinyProp {
  id: number;
  title: string;
  genre: string;
  possible_age: string;
  poster_url: string;
  is_interested: boolean;
}

export default function Series({
  id,
  title,
  genre,
  possible_age,
  poster_url,
  is_interested,
}: ISeriesTinyProp) {
  const { data } = useQuery<IWishlist[]>(["wishlist"], getWishlist, {
    retry: false,
  });
  const { data: seriesData } = useQuery<ISeriesDetail>(
    ["series", id],
    getSeriesDetail
  );
  const [value, setValue] = useState(is_interested);
  const queryClient = useQueryClient();
  const mutation = useMutation(plusToggle, {
    onSuccess: () => {
      queryClient.refetchQueries(["series"]);
      queryClient.refetchQueries(["seriesDrama"]);
      queryClient.refetchQueries(["wishlist"]);
    },
  });
  const countMutation = useMutation(countPlayCount);
  const interestedButtonClick = (
    event: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setValue(!value);
    const seriesPk = id;
    const userPk = data?.[0].id as number;
    mutation.mutate({ userPk, seriesPk });
  };
  const playButtonClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const videoPk = seriesData?.video[0].pk;
    countMutation.mutate({ videoPk });
  };
  return (
    <Link to={`/series/${id}`}>
      <Card
        variants={CardVariants}
        bgPhotos={poster_url}
        initial="normal"
        whileHover="hover"
      >
        <BrightBox variants={brightVariants} bgPhotos={poster_url}></BrightBox>
        <Info variants={InfoVariants}>
          <HStack marginBottom="10px">
            <Button
              color="white"
              onClick={playButtonClick}
              bgColor="transparent"
              variant="link"
            >
              <FaPlayCircle style={{ fontSize: "35px" }} />
            </Button>
            <Button
              color="white"
              onClick={interestedButtonClick}
              bgColor="transparent"
              p="0"
              variant="link"
            >
              {is_interested ? (
                <FaPlusCircle style={{ fontSize: "35px", color: "red" }} />
              ) : (
                <FaPlusCircle
                  style={{
                    fontSize: "35px",
                  }}
                />
              )}
            </Button>
          </HStack>
          <HStack marginBottom="10px">
            <Heading fontSize="20px" style={{ color: "white" }}>
              {title}
            </Heading>
            <Box>{possible_age}</Box>
          </HStack>
          <Box style={{ color: "white" }}>{genre}</Box>
        </Info>
      </Card>
    </Link>
  );
}
