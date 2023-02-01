import {
  Avatar,
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Img,
  Input,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaStar, FaPlay } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  countPlayCount,
  couponGet,
  getSeriesDetail,
  getSeriesReviews,
  reviewPost,
} from "../api";
import { IReview, ISeriesDetail } from "../types";

export interface IReviewVariables {
  text: string;
  rating: number;
}

export default function SeriesDetail() {
  const { seriesPk } = useParams();
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const { data: couponData } = useQuery(["coupon"], couponGet);
  const { data } = useQuery<ISeriesDetail>(
    ["series", seriesPk],
    getSeriesDetail
  );
  const { data: reviewData } = useQuery<IReview[]>(
    ["series", seriesPk, "reviews"],
    getSeriesReviews
  );
  const countMutation = useMutation(countPlayCount, {
    onSuccess: () => {
      console.log("count");
    },
  });
  const playButtonOnClick = () => {
    const videoPk = data?.video[0].pk;
    countMutation.mutate({ videoPk });
  };
  const reviewMutation = useMutation(reviewPost, {
    onSuccess: () => {
      console.log("good");
      queryClient.refetchQueries(["series", seriesPk, "reviews"]);
    },
  });
  const reviewConfirm = ({ text, rating }: IReviewVariables) => {
    const seriesPkVariable = seriesPk as string;
    reviewMutation.mutate({ seriesPkVariable, text, rating });
  };
  return (
    <Box mt="50px">
      <HStack>
        <Img
          w="190"
          h="280"
          mb="40px"
          borderRadius="8px"
          backgroundColor="gray"
          src={data?.poster_url}
        />
        <Box ml="100px">
          <Heading color="white" fontSize="70px">
            {data?.title}
          </Heading>
          <HStack>
            <Text color="gray.200" m="3px">
              {data?.genre.genre_name}
            </Text>
            <Text color="gray.200" m="3px">
              {data?.video[0].runtime}분
            </Text>
            <Text color="gray.200" m="3px">
              |
            </Text>
            <Text color="gray.200" m="3px">
              {data?.possible_age}
            </Text>
          </HStack>
          <Text color="gray.200" w="700px">
            {data?.summary}
          </Text>
        </Box>
      </HStack>
      <Box h="56px" borderTop="1px" borderBottom="1px" display="flex">
        <HStack>
          {couponData?.["exists"] ? (
            <Button
              leftIcon={<FaPlay />}
              colorScheme="pink"
              onClick={playButtonOnClick}
              pl="40px"
              pr="40px"
            >
              감상하기
            </Button>
          ) : null}
          <Box w="90%"></Box>
        </HStack>
      </Box>
      <Tabs color="black" colorScheme="whiteAlpha" align="center">
        <TabList>
          <Tab color={"white"}>콘텐츠 정보</Tab>
          <Tab color={"white"}>회차 정보</Tab>
        </TabList>
        <TabPanels color="white">
          <TabPanel h="100%" textAlign="left">
            <Box>
              <Heading mb="15px">감독/출연</Heading>
              {data?.director.map((directors, index) => (
                <HStack key={index} gap="3">
                  <Avatar src={directors.photo_url} m="5px" />
                  <Box>{directors.director_name}</Box>
                </HStack>
              ))}
              {data?.actor.map((actors, index) => (
                <HStack key={index} gap="3">
                  <Avatar src={actors.photo_url} m="5px" />
                  <Box>{actors.actor_name}</Box>
                </HStack>
              ))}
            </Box>
            <Heading mt="20px" mb="10px">
              감상평
            </Heading>
            <HStack mt="20px" mb="20px">
              <HStack>
                <Input
                  {...register("text")}
                  placeholder="리뷰 작성"
                  variant="flushed"
                  focusBorderColor="white"
                ></Input>
              </HStack>
              <HStack>
                <Select
                  {...register("rating")}
                  w="50px"
                  ml="0"
                  focusBorderColor="white"
                  variant="flushed"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Select>
              </HStack>
              <Button
                colorScheme="pink"
                onClick={handleSubmit(({ text, rating }) => {
                  reviewConfirm({ text, rating });
                })}
              >
                확인
              </Button>
            </HStack>
            {reviewData?.map((review, index) => (
              <Grid
                key={index}
                w="200px"
                mb="15px"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(5, 1fr)"
              >
                <GridItem rowSpan={2} colSpan={1} mr="20px">
                  <Avatar src={review.user.avator} />
                </GridItem>
                <GridItem colSpan={2}>
                  <Text>{review.user.name}</Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <HStack>
                    <Box display="flex">
                      {[...new Array(review.rating)].map(() => (
                        <FaStar />
                      ))}
                    </Box>
                  </HStack>
                </GridItem>
                <GridItem colSpan={4}>
                  <Text color="gray.400" w="100%">
                    {review.text}
                  </Text>
                </GridItem>
              </Grid>
            ))}
          </TabPanel>
          <TabPanel textAlign="left">
            {data?.video.map((episodes, index) => (
              <Grid
                key={index}
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(2, 1fr)"
                gap="3"
              >
                <GridItem colSpan={1} rowSpan={2}>
                  <Image src={episodes.thumbnail_url} />
                </GridItem>
                <GridItem colSpan={2}>
                  <Text>{episodes.sub_title}</Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text>{episodes.runtime}</Text>
                </GridItem>
              </Grid>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
