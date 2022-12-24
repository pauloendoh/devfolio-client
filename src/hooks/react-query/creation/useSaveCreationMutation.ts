import { useMyNotifications } from "@/hooks/useMyNotifications"
import CreationDto from "@/types/domain/creation/CreationDto"
import DTO from "@/types/utils/DTO"
import pushOrReplace from "@/utils/pushOrReplace"
import queryKeys from "@/utils/queryKeys"
import urls from "@/utils/urls"
import { Creation } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
// import useSnackbarStore from "../../../../zustand-stores/useSnackbarStore";

const useSaveCreationMutation = () => {
  const { setSuccessMessage, setErrorMessage } = useMyNotifications()

  const queryClient = useQueryClient()

  return useMutation(
    (creation: CreationDto) =>
      axios
        .request<DTO<Creation>>({
          url: urls.api.creations,
          data: creation,
          method: creation.id ? "PUT" : "POST",
        })
        .then((res) => res.data),
    {
      onSuccess: (saved) => {
        const creations = queryClient.getQueryData<DTO<Creation>[]>([
          queryKeys.creations,
        ])

        const newCreations = pushOrReplace(creations, saved, "id")

        queryClient.setQueryData([queryKeys.creations], newCreations)
        setSuccessMessage("Creation saved!")
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err))
      },
    }
  )
}

export default useSaveCreationMutation
