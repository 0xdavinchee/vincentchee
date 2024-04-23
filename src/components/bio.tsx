/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import {
  faGithub,
  faHashnode,
  faInstagram,
  faLinkedin,
  faMedium,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import { faBookmark, faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faMicrophone } from "@fortawesome/free-solid-svg-icons"
import { graphql, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import Icon from "./icon"

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
            vinandyoung
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
              I'm a fun guy and co-creator of{" "}
              <a target="_blank" href="https://vinandyoung.com">
                Vin & Young
              </a>
              .
            </p>
            <p>
              I like to laugh, learn and live life to the fullest because we're
              all gonna die one day and life is too short not to have fun and do
              what gets you excited to wake up in the morning.
            </p>
            <p>
              I lift, do Brazilian jiu-jitsu, and play basketball to put myself
              into discomfort explicitly.
            </p>
            <p>
              For leisure, I spend time with friends and family, and splurge on
              experiences: <strong>traveling</strong> and cooking or eating
              delicious food.
            </p>
          </div>
        </div>
      )}
      {social && (
        <div>
          <h3>connect with me</h3>
          <Icon
            url={`${social?.vinandyoung || ``}`}
            icon={faMicrophone}
            label="vin & young"
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
