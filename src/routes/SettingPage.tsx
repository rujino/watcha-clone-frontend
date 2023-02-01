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
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
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
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>();
  const [value, setValue] = useState(user?.name);
  const handleChange = (event: any) => setValue(event.target.value);
  const navigator = useNavigate();
  const updateNameMutation = useMutation(updateName);
  const uploadURLMutation = useMutation(getUploadURL, {
    onSuccess: (data: IUploadURLResponse) => {
      console.log(data);
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });
  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      console.log(result);
      createPhotoMutation.mutate({
        avator: `https://imagedelivery.net/vPUWM7VAKMDrq27MB1vliQ/${result.id}/public`,
      });
    },
  });
  const createPhotoMutation = useMutation(createPhoto);
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
            <VStack spacing={5} mt="20px">
              <FormControl>
                <VStack>
                  <Avatar src={user?.avator} size="2sm" />
                  <FormLabel
                    display="inline"
                    border="1px"
                    p="12px 32px 12px 32px"
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
              <FormLabel mb="10px" fontSize="30px" textColor="white">
                이름
              </FormLabel>
              <Input
                {...register("name", {
                  pattern: {
                    value: /^.{2,20}$/,
                    message:
                      "• 이름은 최소 2자, 최대 20자 까지 입력이 가능해요",
                  },
                })}
                variant="filled"
                borderRadius="0px"
                value={value}
                size="lg"
                fontSize="30px"
                color="gray.500"
                onChange={handleChange}
              />
              <Text color={"red"}>{errors.name?.message}</Text>
              <Text mt="10px" color="whiteAlpha.600">
                • 이름은 최소 2자, 최대 20자 까지 입력이 가능해요
              </Text>
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
            borderRadius="0px"
          >
            완료
          </Button>
          <Button
            ml="15px"
            type="submit"
            left="20px"
            colorScheme="red"
            borderRadius="0px"
          >
            취소
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
