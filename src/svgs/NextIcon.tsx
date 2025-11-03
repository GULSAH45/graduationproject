import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const NextIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={7}
    height={11}
    fill="none"
    {...props}
  >
    <Path
      fill="#1C1B1F"
      d="M4.912 5.52.516.963 1.5.005 6.975 5.53l-5.526 5.474-.975-.967L4.912 5.52Z"
    />
  </Svg>
)
export default NextIcon
