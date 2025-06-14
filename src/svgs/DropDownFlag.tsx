import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const DropDownFlag = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#222"
      fillRule="evenodd"
      d="M1.647 4.647a.5.5 0 0 1 .708 0L8 10.294l5.646-5.647a.501.501 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default DropDownFlag
