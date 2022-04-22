import DTO from "@/types/utils/DTO";
import queryKeys from "@/utils/queryKeys";
import urls from "@/utils/urls";
import { Creation } from "@prisma/client";
import axios from "axios";
import { useQuery } from "react-query";

const useCreationsQuery = () => {
  const query = useQuery(queryKeys.creations, () =>
    axios.get<DTO<Creation>[]>(urls.api.creations).then((res) => res.data)
  );
  return { userCreations: query.data };
};

export default useCreationsQuery;
