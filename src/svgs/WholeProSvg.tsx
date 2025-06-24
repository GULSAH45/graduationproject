import * as React from "react"
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg"
const WholeProduct = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Mask
      id="a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <Path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="#1C1B1F"
        fillOpacity={0.5}
        d="M6.857 19.429h9.286V17.57h-1.857v-6.5h-1.857V9.214h3.714V7.357H6.857v1.857h1.857v6.5h1.857v1.857H6.857v1.858Zm0 1.857c-.51 0-.948-.182-1.311-.546A1.788 1.788 0 0 1 5 19.43V17.57c0-.51.182-.948.546-1.311.363-.364.8-.546 1.311-.546v-4.643c-.51 0-.948-.181-1.311-.545A1.788 1.788 0 0 1 5 9.214V7.357c0-.51.182-.948.546-1.311.363-.364.8-.546 1.311-.546h2.786v-.929h-.929V2.714h5.572v1.857h-.929V5.5h2.786c.51 0 .948.182 1.311.546.364.363.546.8.546 1.311v1.857c0 .511-.182.948-.546 1.312-.363.364-.8.545-1.311.545v4.643c.51 0 .948.182 1.311.546.364.363.546.8.546 1.311v1.858c0 .51-.182.948-.546 1.311-.363.364-.8.546-1.311.546H6.857Z"
      />
    </G>
  </Svg>
)
export default WholeProduct
