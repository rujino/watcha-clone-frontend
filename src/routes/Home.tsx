import { useQuery } from "@tanstack/react-query";
import { getSeries } from "../api";
import Containers from "../components/container/Container";
import { ISeriesList } from "../types";

export default function Home() {
  const { isLoading, data } = useQuery<ISeriesList[]>(["series"], getSeries);
  return <Containers isLoading={isLoading} data={data} />;
}
