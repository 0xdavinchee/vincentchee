/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import {
  faBookmark,
  faEnvelope,
  faFile,
} from "@fortawesome/free-regular-svg-icons"
import {
  faTwitter,
  faGithub,
  faInstagram,
  faLinkedin,
  faMedium,
  faHashnode,
} from "@fortawesome/free-brands-svg-icons"
import Icon from "./icon"
import { faPodcast } from "@fortawesome/free-solid-svg-icons"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            unpretentiousai
            twitter
            github
            linkedin
            substack
            email
            lens
            instagram
            medium
            hashnode
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      {author?.name && (
        <div style={{ display: "flex" }}>
          <StaticImage
            className="bio-avatar"
            layout="fixed"
            formats={["auto", "webp", "avif"]}
            src="../images/profile-pic.jpg"
            width={150}
            height={150}
            quality={100}
            alt="Profile picture"
          />
          <div>
            <h2>gm</h2>
            <p>
              I am an <strong>entrepreneurial engineer</strong>.
            </p>
            <p>
              I am a co-creator of{" "}
              <a href="https://unpretentious.ai">unpretentious.ai</a>.
            </p>
            <p>
              Technology is a tool to improve our lives, and I strive to
              leverage it to add value to my own and other people's lives. I am
              especially interested in <strong>crypto</strong> and{" "}
              <strong>AI</strong>.
            </p>
            <p>
              I go to the gym, do Brazilian jiu-jitsu, and play basketball to
              stay <strong>healthy</strong>.
            </p>
            <p>
              To stay <strong>sharp</strong>, I learn new things and apply them
              to make my life better or just out of curiosity.
            </p>
            <p>
              To <strong>enjoy life</strong>, I spend time with friends and
              family, and splurge on experiences: <strong>traveling</strong> and{" "}
              <strong>eating delicious food</strong>.
            </p>
          </div>
        </div>
      )}
      {social && (
        <div>
          <h3>connect with me</h3>
          <Icon
            url={`${social?.unpretentiousai || ``}`}
            icon={faPodcast}
            label="unpretentious.ai"
          />
          <Icon
            url={`${social?.github || ``}`}
            icon={faGithub}
            label="github"
          />

          <Icon
            url={`${social?.twitter || ``}`}
            icon={faTwitter}
            label="twitter"
          />
          <Icon
            url={`${social?.substack || ``}`}
            icon={faBookmark}
            label="substack"
          />
          <Icon
            url={`${social?.hashnode || ``}`}
            icon={faHashnode}
            label="hashnode"
          />
          <Icon
            url={`${social?.email || ``}`}
            icon={faEnvelope}
            label="email"
          />
          <Icon
            url={`${social?.linkedin || ``}`}
            icon={faLinkedin}
            label="linkedin"
          />
          <Icon
            url={`${social?.instagram || ``}`}
            icon={faInstagram}
            label="instagram"
          />
          <Icon
            url={`${social?.medium || ``}`}
            icon={faMedium}
            label="medium"
          />
        </div>
      )}
    </div>
  )
}

export default Bio
