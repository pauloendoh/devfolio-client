import SaveCancelButtons from "@/components/_common/buttons/SaveCancelButtons"
import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter"
import MyTextField from "@/components/_common/inputs/MyTextField"
import useSaveCreationMutation from "@/hooks/react-query/creation/useSaveCreationMutation"
import CreationDto from "@/types/domain/creation/CreationDto"
import { DatePicker } from "@mui/lab"
import {
  Autocomplete,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import utils from "./FeatureDialog.utils"

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
    <Dialog
      onClose={handleClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="creation-dialog"
    >
      <Box pb={1} px={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="creation-dialog-title">
            {watch("id") ? "Edit Feature" : "New Feature"}
          </DialogTitle>
          <DialogContent>
            <Box>
              <MyTextField
                size="small"
                label="Title"
                fullWidth
                required
                autoFocus
                sx={{ mt: 2 }}
                {...register("title")}
              />
            </Box>

            <MyTextField
              size="small"
              label="Description"
              fullWidth
              multiline
              sx={{ mt: 2 }}
              onCtrlEnter={handleSubmit(onSubmit)}
              {...register("description")}
            />

            <FlexVCenter sx={{ mt: 2 }} gap={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Complexity
                </InputLabel>
                <Select
                  label="Complexity"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={props.initialValue.complexity}
                  {...register("complexity")}
                >
                  <MenuItem value={undefined}> </MenuItem>

                  {utils.fibonacciNumbers.map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <DatePicker
                label="Created at"
                inputFormat="dd/MM/yyyy"
                value={watch("date")}
                onChange={(newValue) => {
                  setValue("date", newValue)
                }}
                renderInput={(params) => (
                  <TextField {...params} size="small" fullWidth />
                )}
              />
            </FlexVCenter>

            <Box mt={2} />
            <Autocomplete
              multiple
              id="tags-standard"
              options={[]}
              value={watch("technologies")}
              freeSolo
              // getOptionLabel={(option) => option.title}
              onChange={(_, val) => {
                setValue("technologies", val as string[])
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Technologies (5 max)"
                  placeholder={
                    watch("technologies").length > 0
                      ? ""
                      : "React, TypeScript, etc... Ctrl Enter to add new"
                  }
                  size="small"
                />
              )}
            />
          </DialogContent>
          <DialogTitle>
            <SaveCancelButtons disabled={isSubmitting} onCancel={handleClose} />
          </DialogTitle>
        </form>
      </Box>
    </Dialog>
  )
}

export default CreationDialog
