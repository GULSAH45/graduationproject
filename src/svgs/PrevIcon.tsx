import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const PrevIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={7}
    height={11}
    fill="none"
    {...props}
  >
    <Path
      fill="#1C1B1F"
      d="M2.088 5.52 6.484.963 5.5.005.025 5.53l5.526 5.474.975-.967L2.088 5.52Z"
    />
  </Svg>
)
export default PrevIcon
