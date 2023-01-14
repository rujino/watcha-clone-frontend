import { Box, Divider, Heading } from "@chakra-ui/react";
import WishlistContainer from "../components/container/WishlistContainer";

export default function WishlistPage() {
  return (
    <>
      <Heading pt="100px" color="white">
        좋아요 추가한 컨텐츠
      </Heading>
      <Divider mt="50px" mb="50px" />
      <WishlistContainer></WishlistContainer>
      <Box h="119px"></Box>
    </>
  );
}
