import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createPhoto, getUploadURL, updateName, uploadImage } from "../api";
import useUser from "../lib/useUser";

interface IForm {
  file: FileList;
  name: string;
}

interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

export default function SettingPage() {
  const { register, handleSubmit, watch } = useForm<IForm>();
  const navigator = useNavigate();
  const updateNameMutation = useMutation(updateName);
  const createPhotoMutation = useMutation(createPhoto);
  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      console.log(result);
      createPhotoMutation.mutate({
        avator: `https://imagedelivery.net/vPUWM7VAKMDrq27MB1vliQ/${result.id}/public`,
      });
    },
  });
  const uploadURLMutation = useMutation(getUploadURL, {
    onSuccess: (data: IUploadURLResponse) => {
      console.log(data);
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });
  const { user } = useUser();
  const onSubmit = () => {
    uploadURLMutation.mutate();
    updateNameMutation.mutate({ name: watch("name") });
    navigator("/");
  };
  return (
    <Box
      pb={40}
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Container pt="200px">
        <Heading textAlign={"center"} color="white">
          프로필 수정
        </Heading>
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <HStack>
            <VStack spacing={5} mt={10}>
              <FormControl>
                <VStack>
                  <Avatar src={user?.avator} size="mg" />
                  <FormLabel
                    display="inline"
                    border="1px"
                    p="10px"
                    color="whitesmoke"
                    cursor="pointer"
                  >
                    이미지 변경
                  </FormLabel>
                  <Input
                    {...register("file")}
                    type="file"
                    accept="image/*"
                    position="absolute"
                    w="1px"
                    h="1px"
                    border="0"
                    p="0"
                    m="-1px"
                    overflow="hidden"
                  />
                </VStack>
              </FormControl>
            </VStack>
            <FormControl>
              <FormLabel fontSize="lg" textColor="white">
                {user?.name}
              </FormLabel>
              <Input
                {...register("name")}
                size="lg"
                placeholder="변경할 이름"
                color="white"
              />
            </FormControl>
          </HStack>
          <Divider mt="20px" mb="20px" color="white" />
          <Button
            isLoading={
              createPhotoMutation.isLoading ||
              uploadImageMutation.isLoading ||
              uploadURLMutation.isLoading
            }
            type="submit"
            left="20px"
            colorScheme="red"
          >
            완료
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
