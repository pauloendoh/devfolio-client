import DataGridAccordion from "@/components/playground/DataGridAccordion/DataGridAccordion";
import Flex from "@/components/_common/flexboxes/Flex";
import urls from "@/utils/urls";
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const IndexPageRoute: NextPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const { data, status } = useSession();

  if (status === "unauthenticated") router.push(urls.pages.index);

  return (
    <Container>
      <Typography variant="h6">Playground</Typography>
      <Flex flexDirection="column" mt={2} style={{ gap: theme.spacing(2) }}>
        <DataGridAccordion />
        <Box mt={4} />
      </Flex>
    </Container>
  );
};

export default IndexPageRoute;
