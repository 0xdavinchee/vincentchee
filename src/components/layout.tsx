import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        <div style={{ display: "flex", alignItems: "center" }}>
          <StaticImage
            className="header-logo"
            layout="fixed"
            formats={["auto", "webp", "avif"]}
            src="../images/black-logo.png"
            width={50}
            height={50}
            quality={100}
            alt="logo"
          />
          {title}
        </div>
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}</footer>
    </div>
  )
}

export default Layout
