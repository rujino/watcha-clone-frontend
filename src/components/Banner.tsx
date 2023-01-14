import { Box, Divider, Heading, Img, Text } from "@chakra-ui/react";
import styled from "styled-components";

const Space = styled.div`
  height: 56px;
  width: 100%;
`;

export default function Banner() {
  return (
    <Box paddingTop="65px">
      <Heading color="white">홈</Heading>
      <Divider mt="20px" mb="20px" color="whiteAlpha.500" />
      <Box display="flex">
        <Box margin="5px">
          <Text color="white">스테디셀러</Text>
          <Heading color="white">최고 인기작</Heading>
          <Text color="white" mb="5px">
            뭘 볼지 모르겠다면 여기서 골라보세요!
          </Text>
          <Img
            src="https://imagedelivery.net/vPUWM7VAKMDrq27MB1vliQ/96b3ca49-76e2-419e-2f28-f0c3dfe04300/public"
            w="523px"
            h="294px"
          />
        </Box>
        <Box margin="5px">
          <Text color="white">베스트 셀렉션</Text>
          <Heading color="white">오직 왓챠에서</Heading>
          <Text color="white" mb="5px">
            만나보는 독점 오리지널 & 익스클루시브 콘텐츠
          </Text>
          <Img
            src="https://imagedelivery.net/vPUWM7VAKMDrq27MB1vliQ/e75c3e5b-b3ae-4b44-943f-7de00c94e600/public"
            w="523px"
            h="294px"
          />
        </Box>
        <Box margin="5px">
          <Text color="white">새로 올라왔어요</Text>
          <Heading color="white">1월 1주 신작</Heading>
          <Text color="white" mb="5px">
            트립메이트: 후아유, 달이 지는 밤 등
          </Text>
          <Img
            src="https://imagedelivery.net/vPUWM7VAKMDrq27MB1vliQ/d3052c20-bbf1-4f2a-cbf2-870b1ff9c200/public"
            w="523px"
            h="294px"
          />
        </Box>
      </Box>
      <Space />
    </Box>
  );
}
