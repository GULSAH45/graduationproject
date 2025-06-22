import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const CheckSvg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <Path stroke="#2126AB" d="M.5.5h14v14H.5z" />
    <Path
      fill="#2126AB"
      fillRule="evenodd"
      d="m10.875 5.813-4.5 4.5-2.25-2.25.844-.844 1.406 1.406 3.656-3.656.844.843Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default CheckSvg
