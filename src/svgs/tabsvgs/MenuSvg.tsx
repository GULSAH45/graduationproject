import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#1C1B1F"
      d="M0 8V0h8v8H0Zm0 10v-8h8v8H0ZM10 8V0h8v8h-8Zm0 10v-8h8v8h-8ZM2 6h4V2H2v4Zm10 0h4V2h-4v4Zm0 10h4v-4h-4v4ZM2 16h4v-4H2v4Z"
    />
  </Svg>
)
export default SvgComponent
