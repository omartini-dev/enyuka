import React from "react"
import { graphql } from "gatsby";
import { Link } from "gatsby"
import "../css/app.css"
import "../css/font.css"
import "../css/style.css"
import "../css/home.css"
import { Container, Row, Col } from 'react-bootstrap';
import FeaturedCard from "../components/Cards/FeaturedCard"
import Layout from "../components/layout"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

const Portfolio = ({data}) => {
	return (
		<Layout slug="portfolio">
			<section className="portfolio-section">
				<div className="page-location">
					<Link to="/">home</Link>
					<span className="px-2"><FontAwesomeIcon icon={fas.faAngleRight} /></span>
					
					<span className="active">portfolio</span>
				</div>
				<Container className="featured-card-container top-features">
					<Row>
					{
						data?.featuredToLet?.nodes && data.featuredToLet?.nodes.map((_card, index)=>(
							<Col lg="4" key={index} className="px-5 mb-5">
							<FeaturedCard data={_card} />
							</Col>
						))
					}
					</Row>
				</Container>
				<h2>GET IN TOUCH</h2>
			</section>
		</Layout>
	)
}

export default Portfolio

export const query = graphql`
	query {
		featuredToLet: allD9PropertyToLet {
			nodes {
				objectID
				gmaven_mapped_key
				property_gmaven_key
				property_name
				street_address
				suburb
				city
				province
				country
				cluster
				latitude
				longitude
				marketing {
					property_marketing_description
					unit_marketing_heading
					unit_marketing_description
				}
				total_property_gla
				total_erf_extent
				property_category
				property_sub_category
				unit_category
				secondary_category
				property_featured
				best_image
				status
				status_date
				web_ref
				gross_price
				net_price
				available_type
				available_date
				unit_id
				complex_space
				unit_responsibility {
					gmaven_contact_key
					cell_number
					email
					name
					image
					role
				}
				min_gla
				max_gla
				sub_divisible
				this_unit_can_be_leased_by_itself
				combinable
				property_video
				video
				property_virtual_tour
				virtual_tour
				property_update_date
				unit_update_date
				property_images {
					image_path_url
					type
				}
				office_features {
					has_aircon
					no_floors
					lift_count
					lift_cores
					has_internet
					internet_provider
				}
				industrial_features {
					power_phase
					power_output
					power_unit
					has_yard
					height_to_eaves
					lux_level
					lux_description
					gantry_cranes
					floor_load_capacity
				}
				parking {
					property_parking
					property_parking_ratio
					property_parking_open
					property_parking_basement
					property_parking_covered
					property_parking_shade
					property_parking_tandem
				}
				general_features {
					property_naming_rights
					security_guards
					security_hours
					security_responsibility
					has_security
					security_infrustructure
					green_certification
					green_certification_rating
					has_generators
					solar
					backup_water_supply
					canteen
					property_kitchenette
					gym
					boardroom
					showers
				}
			}
		}
		
	}
`