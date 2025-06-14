import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const DropdownMinus = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M13.75 1.896H2.25a.5.5 0 0 0-.5.5v11.5a.5.5 0 0 0 .5.5h11.5a.5.5 0 0 0 .5-.5v-11.5a.5.5 0 0 0-.5-.5Zm-.625 11.375H2.875V3.021h10.25v10.25Z"
    />
    <Path fill="#000" d="M10.703 7v1.702H6V7h4.703Z" />
  </Svg>
)
export default DropdownMinus
