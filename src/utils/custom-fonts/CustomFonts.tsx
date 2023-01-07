import { Global } from "@mantine/core"
import notoSans from "./NotoSans.ttf"

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Noto Sans",
            src: `url('${notoSans}') format("ttf")`,
            fontWeight: 700,
            fontSize: 13,
            fontStyle: "normal",
          },
        },
      ]}
    />
  )
}
