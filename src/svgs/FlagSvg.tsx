import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const FlagSvg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={32}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path fill="#E30A17" d="M0 8h24v16H0V8Z" />
      <Path
        fill="#fff"
        d="M12.15 13.55a3.576 3.576 0 0 0-2.12-.68c-1.908 0-3.452 1.442-3.452 3.224 0 1.783 1.548 3.224 3.452 3.224.8 0 1.54-.253 2.12-.679a4.141 4.141 0 0 1-5.816.725 4.142 4.142 0 0 1-.725-5.815 4.142 4.142 0 0 1 6.54 0Zm1.866 3.078-.847 1.024.057-1.329-1.236-.486 1.278-.356.084-1.324.73 1.11 1.286-.333-.818 1.03.715 1.117-1.249-.453Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 8h24v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default FlagSvg
