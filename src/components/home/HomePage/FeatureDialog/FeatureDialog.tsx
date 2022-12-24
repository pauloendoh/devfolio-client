import SaveCancelButtons from "@/components/_common/buttons/SaveCancelButtons"
import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter"
import MyTextField from "@/components/_common/inputs/MyTextField"
import useSaveCreationMutation from "@/hooks/react-query/creation/useSaveCreationMutation"
import CreationDto from "@/types/domain/creation/CreationDto"
import { Box, Modal, MultiSelect, Select } from "@mantine/core"
import { DatePicker } from "@mantine/dates"

import { useEffect } from "react"
import { useForm } from "react-hook-form"

interface Props {
  open: boolean
  initialValue: CreationDto
  onClose: () => void
  afterSave?: (returned: CreationDto) => void
}

const CreationDialog = (props: Props) => {
  const { mutate } = useSaveCreationMutation()

  // const history = useRouter();

  // const { setSuccessMessage } = useSnackbarStore();

  const handleClose = () => {
    props.onClose()
  }

  const onSubmit = (values: CreationDto) => {
    mutate(values, {
      onSuccess: (data) => {
        // setSuccessMessage("Decision saved!");
        handleClose()
        // history.push(pageUrls.BigDecisions.decision(data.id));
      },
    })
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
    register,
    watch,
    getValues,
    setValue,
    reset,
  } = useForm<CreationDto>({
    defaultValues: props.initialValue,
  })

  useEffect(() => {
    if (props.open) reset(props.initialValue)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open])

  return (
    <Modal
      onClose={handleClose}
      opened={props.open}
      size="xs"
      aria-labelledby="creation-dialog"
      title={watch("id") ? "Edit Feature" : "New Feature"}
    >
      <Box pb={1} px={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <MyTextField
              label="Title"
              width="100%"
              required
              autoFocus
              sx={{ mt: 2 }}
              {...register("title")}
            />
          </Box>

          <MyTextField
            label="Description"
            width="100%"
            sx={{ mt: 2 }}
            onCtrlEnter={handleSubmit(onSubmit)}
            {...register("description")}
          />

          <FlexVCenter sx={{ mt: 2 }} gap={2}>
            <Select
              label="Complexity"
              id="demo-simple-select"
              // {...register("complexity")}
              data={[
                {
                  value: "1",
                  label: "1",
                },
              ]}
            >
              {/* <MenuItem value={undefined}> </MenuItem>

                  {utils.fibonacciNumbers.map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))} */}
            </Select>

            <DatePicker
              label="Created at"
              inputFormat="dd/MM/yyyy"
              value={new Date(watch("date") || new Date())}
              onChange={(newValue) => {
                setValue("date", newValue?.toJSON() || null)
              }}
            />
          </FlexVCenter>

          <Box mt={2} />
          <MultiSelect
            id="tags-standard"
            data={[]}
            value={watch("technologies")}
            // getOptionLabel={(option) => option.title}
            onChange={(val) => {
              setValue("technologies", val as string[])
            }}
          />

          <Box mt={2} />
          <SaveCancelButtons disabled={isSubmitting} onCancel={handleClose} />
        </form>
      </Box>
    </Modal>
  )
}

export default CreationDialog