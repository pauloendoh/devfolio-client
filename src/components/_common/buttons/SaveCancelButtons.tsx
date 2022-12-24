import { Box, Button, Flex } from "@mantine/core"

interface Props {
  submitButtonId?: string
  disabled?: boolean
  onSave?: () => void
  onCancel?: () => void
}

const SaveCancelButtons = (props: Props) => {
  return (
    <Flex>
      <Button
        type="submit"
        color="primary"
        id={props.submitButtonId}
        disabled={props.disabled}
        onClick={props.onSave}
      >
        Save
      </Button>

      <Box ml={1}>
        <Button onClick={props.onCancel} color="inherit">
          Cancel
        </Button>
      </Box>
    </Flex>
  )
}

export default SaveCancelButtons
