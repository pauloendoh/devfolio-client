import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter"
import useTechCount from "@/hooks/domain/creation/tech/useTechCount"
import urls from "@/utils/urls"
import { Box, Button, Flex, Text } from "@mantine/core"
import { useRouter } from "next/router"

const TopTechnologies = () => {
  const router = useRouter()
  const techs = router.query.techs

  const techCount = useTechCount()

  const handleClickTech = (tech: string) => {
    if (techs && techs === tech) return router.push(urls.pages.index)
    return router.push(urls.pages.homeTechs([tech]))
  }

  const techIsSelected = (tech: string) => {
    const techs = router.query.techs
    if (techs && (techs === tech || techs.includes(tech))) return true
    return false
  }

  return (
    <Flex sx={{ flexWrap: "wrap" }}>
      <Text>Top technologies: </Text>

      <Flex sx={{ flexWrap: "wrap", gap: 1, ml: 1 }}>
        {techCount.map((tc) => (
          <Button
            key={tc.techName}
            variant="outline"
            size="sm"
            color="inherit"
            onClick={() => handleClickTech(tc.techName)}
            sx={{
              fontWeight: 400,
              backgroundColor: techIsSelected(tc.techName) ? "gray" : undefined,
            }}
          >
            <Flex>
              <Box>{tc.techName}</Box>
              <FlexVCenter
                sx={{
                  background: "#393939",
                  paddingLeft: 1,
                  paddingRight: 1,
                  borderRadius: "3px",
                  ml: 1,
                }}
              >
                {tc.count}
              </FlexVCenter>
            </Flex>
          </Button>
        ))}
      </Flex>
    </Flex>
  )
}

export default TopTechnologies
