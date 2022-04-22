import { Box, Button } from "@mui/material";
import React from "react";
import Flex from "../flexboxes/Flex";

interface Props {
  submitButtonId?: string;
  disabled?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}

const SaveCancelButtons = (props: Props) => {
  return (
    <Flex>
      <Button
        type="submit"
        variant="contained"
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
  );
};

export default SaveCancelButtons;
