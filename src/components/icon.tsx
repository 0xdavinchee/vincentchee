import * as React from "react"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface IconProps {
  readonly url: string
  readonly icon: IconProp
  readonly label: string
  readonly isDownload?: boolean;
}

const Icon = (props: IconProps) => {
  return (
    <div style={{ display: "flex", marginBottom: "0.5rem" }}>
      <a href={props.url} download={props.isDownload}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon icon={props.icon} />
          <p style={{ paddingLeft: "0.25rem" }}>{props.label}</p>
        </div>
      </a>
    </div>
  )
}

export default Icon
