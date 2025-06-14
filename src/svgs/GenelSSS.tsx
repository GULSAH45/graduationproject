import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const GenelSSS = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      fill="#2126AB"
      d="M21.996 2.813H2.004a2.001 2.001 0 0 0-2.004 2v14.666c0 1.104.896 2 2.004 2h19.992a2.001 2.001 0 0 0 2.004-2V4.813c0-1.105-.896-2-2.004-2Zm-19.742 2h19.492a.25.25 0 0 1 .25.25v1.75H2.004v-1.75a.25.25 0 0 1 .25-.25Zm19.492 14.666H2.254a.25.25 0 0 1-.25-.25v-7.083h19.992v7.083a.25.25 0 0 1-.25.25ZM8 15.313v1.666c0 .275-.225.5-.5.5h-3a.501.501 0 0 1-.5-.5v-1.666c0-.276.225-.5.5-.5h3c.275 0 .5.224.5.5Zm8 0v1.666c0 .275-.225.5-.5.5H9.833a.501.501 0 0 1-.5-.5v-1.666c0-.276.225-.5.5-.5H15.5c.275 0 .5.224.5.5Z"
    />
  </Svg>
)
export default GenelSSS
