import { Button, Text, Input, Box, Img, HStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUser, createWishlist, IUserCreateVariables } from "../api";

export interface IUserCreateCheckVariables {
  username: string;
  password: string;
  password_check: string;
  name: string;
}

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<IUserCreateCheckVariables>();
  const queryClient = useQueryClient();
  const userCreateMutation = useMutation(createUser, {
    onSuccess: (data) => {
      console.log(data["detail"]);
      if (data["detail"] === "same username") {
        setError(
          "username",
          { message: "아이디가 중복입니다." },
          { shouldFocus: true }
        );
      } else {
        reset(); // form 초기화
        navigator("/user/log-in/");
      }

      queryClient.refetchQueries(["me"]);
    },
    onError: (data) => {
      console.log("error", data);
    },
  });
  const createWishlistMutation = useMutation(createWishlist, {
    onSuccess: () => {
      console.log("wishlist create success");
    },
  });
  const onSubmit = (data: IUserCreateVariables) => {
    userCreateMutation.mutate(data);
    createWishlistMutation.mutate();
  };
  const onPasswordValid = (data: IUserCreateCheckVariables) => {
    if (data.password_check !== data.password) {
      setError(
        "password_check",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
      return false;
    } else {
      onSubmit(data);
    }
  };
  const navigator = useNavigate();
  const goToLoginOnClick = () => {
    navigator("/user/log-in");
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
            onClick={goToLoginOnClick}
          >
            로그인
          </Button>
        </HStack>
      </Box>
      <Box
        as="form"
        w="300px"
        position="absolute"
        top="35%"
        left="41%"
        onSubmit={handleSubmit((data) => {
          onPasswordValid(data);
        })}
      >
        <Text mb="5px" color="white" fontSize="20px" fontWeight="bold">
          회원가입
        </Text>
        <Input
          mb="5px"
          placeholder="이메일 ex) id@email.com"
          bgColor="white"
          type="email"
          {...register("username", {
            required: "이메일을 입력해 주세요",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "이메일 형식으로 입력해주세요.",
            },
          })}
        />
        <Text color={"red"}>{errors.username?.message}</Text>
        <Input
          mb="5px"
          placeholder="비밀번호"
          type="password"
          bgColor="white"
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            pattern: {
              value: /^[a-z0-9_-]{8,16}$/,
              message: "8~16자로 영문 소문자, 숫자를 조합해서 사용하세요.",
            },
          })}
        />
        <Text color={"red"}>{errors.password?.message}</Text>
        <Input
          mb="5px"
          placeholder="비밀번호 확인"
          type="password"
          bgColor="white"
          {...register("password_check", {
            required: "비밀번호를 확인해주세요",
            pattern: {
              value: /^[a-z0-9_-]{8,16}$/,
              message:
                "8~16자로 영문 소문자, 숫자, 특수기호를 조합해서 사용하세요.",
            },
          })}
        />
        <Text color={"red"}>{errors.password_check?.message}</Text>
        <Input
          placeholder="이름"
          bgColor="white"
          {...register("name", { required: "이름을 입력해주세요" })}
        />
        <Text color={"red"}>{errors.name?.message}</Text>
        <Box mb="25px" />
        <Button
          w="100%"
          bgColor="pink.500"
          isLoading={userCreateMutation.isLoading}
          type="submit"
        >
          Sign in
        </Button>
      </Box>
    </Box>
  );
}
