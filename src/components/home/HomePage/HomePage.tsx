import Flex from "@/components/_common/flexboxes/Flex"
import FlexCol from "@/components/_common/flexboxes/FlexCol"
import FlexHCenter from "@/components/_common/flexboxes/FlexHCenter"
import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter"
import useTechCount from "@/hooks/domain/creation/tech/useTechCount"
import useCreationsQuery from "@/hooks/react-query/creation/useCreationsQuery"
import { useGithubUserInfo } from "@/hooks/useGithubUsername"
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { FaGithub } from "react-icons/fa"
import CreationsTable from "./CreationsTable/CreationsTable"
import TopTechnologies from "./TopTechnologies/TopTechnologies"

const HomePage = () => {
  const { data } = useSession()
  const { data: userCreations, isLoading } = useCreationsQuery()
  const techCount = useTechCount()

  const userInfo = useGithubUserInfo(data?.user?.image)

  if (!data?.user) return null

  return (
    <div>
      HELLO! {data.user?.name} -{" "}
      <Button onClick={() => signOut()}>logout</Button>
      <Container sx={{ mt: 4 }}>
        <Flex gap={2}>
          <Box sx={{ borderRadius: 64, overflow: "hidden" }}>
            <Image
              loader={() => `${data.user?.image}`}
              unoptimized
              width={64}
              height={64}
              src={`${data.user.image}`}
              alt="profile-image"
            />
          </Box>
          <FlexCol>
            <Typography variant="h6">{data.user.name}</Typography>

            <FlexVCenter gap={1}>
              <Typography color="#979797">@{userInfo?.login}</Typography>

              <a
                href={`https://github.com/${userInfo?.login}`}
                target="_blank"
                style={{ display: "flex", alignItems: "center" }}
              >
                <FaGithub color="white" />
              </a>
            </FlexVCenter>
          </FlexCol>
        </Flex>

        <Box mt={5} />
        <TopTechnologies />
        <Box mt={4}>
          {isLoading ? (
            <FlexHCenter>
              <CircularProgress />
            </FlexHCenter>
          ) : (
            <CreationsTable creations={userCreations || []} />
          )}
        </Box>
      </Container>
    </div>
  )
}

export default HomePage
