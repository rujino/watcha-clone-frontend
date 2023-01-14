import {
  Heading,
  VStack,
  Text,
  Spinner,
  useToast,
  useQuery,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogIn } from "../api";

export default function GithubConfirm() {
  const { search } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const githubLoginMutation = useMutation(githubLogIn, {
    onSuccess: () => {
      queryClient.refetchQueries(["me"]);
      navigate("/"); // redirection
    },
  });
  const confirmLogin = async () => {
    const params = new URLSearchParams(search); // search parameter 란 URL에서 ? 다음에 오는 걸 의미
    const code = params.get("code"); // django backend에 code param 전달해야한다.
    if (code) {
      githubLoginMutation.mutate(code);
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading>Processing log in</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
