import { Flex } from "@mantine/core"
import React from "react"

type Props = React.ComponentProps<typeof Flex> & {
  children: React.ReactNode
}

// PE 3/3
const FlexVCenter = (props: Props) => {
  return (
    <Flex
      sx={{
        alignItems: "center",
      }}
      {...props}
    >
      {props.children}
    </Flex>
  )
}

export default FlexVCenter
