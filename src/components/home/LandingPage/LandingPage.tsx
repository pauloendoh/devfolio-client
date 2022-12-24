import FlexCol from "@/components/_common/flexboxes/FlexCol"
import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter"
import { Button, Paper, Text } from "@mantine/core"
import { signIn } from "next-auth/react"
import { FaGithub } from "react-icons/fa"

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
        <FlexCol gap={1} align="center">
          <Text size="md">devfol.io</Text>
          <Text>Porfolio for developers</Text>
        </FlexCol>

        <FlexVCenter mt={2}>
          <hr style={{ width: "100%" }} />
          <Text sx={{ px: 1, whiteSpace: "nowrap" }}>Enter via </Text>
          <hr style={{ width: "100%" }} />
        </FlexVCenter>

        <Button
          onClick={() => signIn("github")}
          size="lg"
          variant="filled"
          color="info"
          sx={{ mt: 2, width: 250 }}
          fullWidth
        >
          <FlexVCenter gap={1}>
            <FaGithub />
            <Text>Github</Text>
          </FlexVCenter>
        </Button>
      </Paper>
    </div>
  )
}

export default LandingPage
