import {
  Box,
  Button,
  Text,
  Input,
  Divider,
  Img,
  HStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { usernameLogIn } from "../api";

export interface IForm {
  username: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();
  const queryClient = useQueryClient();
  const loginMutation = useMutation(usernameLogIn, {
    // useMutation 쓰는 이유 => 여러 처리 상태에 대한 구조화
    onMutate: () => {
      console.log("Mutation starting");
    },
    onSuccess: () => {
      reset(); // form 초기화
      navigator("/");
      queryClient.refetchQueries(["me"]);
    },
    onError: () => {
      alert("Login error");
      console.log("Login error");
    },
  });
  const goToSignUpOnClick = () => {
    navigator("/user/sign-in");
  };
  const navigator = useNavigate();
  const onSubmit = ({ username, password }: IForm) => {
    loginMutation.mutate({ username, password });
  };
  const onLogoClick = () => {
    navigator("/");
  };
  return (
    <Box>
      <Box
        filter="brightness(50%)"
        w="100vw"
        h="100vh"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgImage="https://imagedelivery.net/vPUWM7VAKMDrq27MB1vliQ/89e76568-12f5-44ae-b631-baee9d1f3400/public"
      ></Box>
      <Box w="100%" position="absolute" top="2%" right="1%">
        <HStack justify="space-between">
          <Img
            src="https://imagedelivery.net/vPUWM7VAKMDrq27MB1vliQ/e7a4773f-17ff-44ed-4a38-fccddaf3a200/public"
            w="100px"
            ml="40px"
            onClick={onLogoClick}
            cursor="pointer"
          />
          <Button
            fontSize="13px"
            borderRadius="20px"
            onClick={goToSignUpOnClick}
          >
            회원가입
          </Button>
        </HStack>
      </Box>
      <Box
        as="form"
        w="300px"
        bgColor="rgba(255, 255, 255, 0)"
        position="absolute"
        top="35%"
        left="41%"
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
      >
        <Text mb="5px" color="white" fontSize="20px" fontWeight="bold">
          로그인
        </Text>
        <Input
          mb="5px"
          bgColor="white"
          isInvalid={Boolean(errors.username?.message)}
          placeholder="Username"
          {...register("username", { required: "Username을 입력하세요." })}
        />
        <Input
          mb="20px"
          bgColor="white"
          isInvalid={Boolean(errors.password?.message)}
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password을 입력하세요." })}
        />
        <Button
          w="100%"
          bgColor="pink.500"
          isLoading={loginMutation.isLoading}
          type="submit"
        >
          Log in
        </Button>
        <Divider mt="10px" mb="10px" />
        <Text fontSize="10px" color="white">
          다른 방법으로 로그인 하기
        </Text>
        <Button
          as="a"
          href="https://github.com/login/oauth/authorize?client_id=384d5b15fea1a357b00c&scope=read:user,user:email"
          w="100%"
          leftIcon={<FaGithub fontSize="30px" />}
        ></Button>
      </Box>
    </Box>
  );
}
