import React from "react"
import { graphql } from "gatsby";
// import { Link } from "gatsby"
import "../css/app.css"
import "../css/font.css"
import "../css/style.css"
import "../css/home.css"
import bannerImg from "../images/about-us-page-circle.png"
import mapImg from "../images/map.png"

import Layout from "../components/layout"

const AboutUs = () => {
	return (
		<Layout slug="about-us">
			<section>
				<div className="wrapper">
					<div className="enyuka_portfolio">
						<img src="../../images/backing-mountain.png" alt="" title="" />
						<div className="banner">
							<div className="l_bar">
								<h4>About Enyuka.</h4>
								<p>
									born from <span>ONE</span> Property Holdings and <span>Emira</span>
									Income Fund. The result is a power house
									leading the charge in the property sector.
								</p>
								<button>Portfolio</button>
							</div>
							<div className="r_bar about-image">
								<img
									src={bannerImg}
									alt=""
									title=""
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="map-banner">
					<div className="map-content">
						<img src={mapImg} alt="" />
					</div>
					<div className="txt-bar">
						<p>
							Emira holds a 49.9% share of the ordinary equity
							in the business and ONE a 50.1% share.
							Enyuka started out with Emira’s R575 million
							portfolio of 15 retail properties, a R50 million
							cash contribution from ONE and a gearing cap
							of 50%, which created a war chest for
							immediate acquisitions and developments of up
							to R625 million.
						</p>
					</div>
				</div>
				<h2>GET IN TOUCH</h2>
			</section>
		</Layout>
	)
}

export default AboutUs
