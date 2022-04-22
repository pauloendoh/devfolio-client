import FlexCol from "@/components/_common/flexboxes/FlexCol";
import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import { Button, Paper, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div>
      <Paper
        sx={{
          p: 4,
          width: "fit-content",
          mt: 20,
          mx: "auto",
        }}
      >
        <FlexCol gap={1} alignItems="center">
          <Typography variant="h4">devfol.io</Typography>
          <Typography>Porfolio for developers</Typography>
        </FlexCol>

        <FlexVCenter mt={2}>
          <hr style={{ width: "100%" }} />
          <Typography sx={{ px: 1, whiteSpace: "nowrap" }}>
            Enter via{" "}
          </Typography>
          <hr style={{ width: "100%" }} />
        </FlexVCenter>

        <Button
          onClick={() => signIn("github")}
          size="large"
          variant="contained"
          color="info"
          sx={{ mt: 2, width: 250 }}
          fullWidth
        >
          <FlexVCenter gap={1}>
            <FaGithub />
            <Typography>Github</Typography>
          </FlexVCenter>
        </Button>
      </Paper>
    </div>
  );
};

export default LandingPage;
