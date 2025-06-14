import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M12.75.75H1.25a.5.5 0 0 0-.5.5v11.5a.5.5 0 0 0 .5.5h11.5a.5.5 0 0 0 .5-.5V1.25a.5.5 0 0 0-.5-.5Zm-.625 11.375H1.875V1.875h10.25v10.25Z"
    />
  </Svg>
)
export default SvgComponent
