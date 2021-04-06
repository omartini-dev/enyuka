import React, { useState } from "react";
import { graphql } from "gatsby";
import "../css/app.css"
import "../css/font.css"
import "../css/style.css"
import "../css/home.css"
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "gatsby"
import Layout from "../components/layout"
import contactImg from "../images/contact.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import GoogleMapReact from 'google-map-react';

export default function PropertyToLet({ data }) {

	var property = data.property.nodes;
	var relatedProperties = data.related.nodes;
	const mapCenter = {
		lat: property[0]?.latitude,
		lng: property[0]?.longitude
	}
	//Images
	var property_images = [];

	if (property[0].property_images) {
		property_images = property[0].property_images;
	}

	var showExt = property_images.filter(image => image.type === "exterior") || [];
	var showInt = property_images.filter(image => image.type === "interior") || [];
	var showFloor = property_images.filter(image => image.type === "floor_plan") || [];
	var showVid = property[0].property_video || [];

	//Pre-select the first category of media
	const imageBoolean = {
		0: showExt.length > 0,
		1: showInt.length > 0,
		2: showFloor.length > 0,
		3: showVid.length > 0
	}

	const firstBoolean = Object.keys(imageBoolean).find(key => imageBoolean[key] === true);
	const showFirst = parseInt(firstBoolean);

	const [selectedImage, setImage] = useState(0);
	const [carouselNo, setCarouselNo] = useState(0);

	//Responsibility
	var property_responsibility = [];

	if (property[0].property_responsibility) {
		property_responsibility = property[0].property_responsibility;
	}
	const moveCarousel= (step)=>{
		if(carouselNo+step>property_images.length-3 || carouselNo+step<0){
			return false
		}
		setCarouselNo(carouselNo+step)
	}
	return (
		<Layout slug="portfolio">
			<section className="portfolio-retail-section">
				<div className="portfolio-retail-section-header px-4">
					<div className="page-location">
						<Link to="/">home</Link>
						<span className="px-2"><FontAwesomeIcon icon={fas.faAngleRight} /></span>
						<Link to="/portfolio">portfolio</Link>
						<span className="px-2"><FontAwesomeIcon icon={fas.faAngleRight} /></span>
						<span className="active">Retail</span>
					</div>
				</div>
				<Container className="px-3 content-wrapper">
					<Row>
						<Col md="6" className="pr-md-5 mb-5">
							<h1>{property[0]?.marketing?.unit_marketing_heading}</h1>
							<p dangerouslySetInnerHTML={{__html:property[0]?.marketing?.unit_marketing_description}}/>
							<Row className="property-detail">
								<Col xs={6}>
									<h1>267</h1>
								</Col>
								<Col xs={6}>
									<h1>5k<span>m <sup>2</sup></span></h1>

								</Col>
							</Row>
							<div className="map-container">
								<GoogleMapReact
									bootstrapURLKeys={{ key: 'AIzaSyCHiKZRNzZcBhp-kwfspvYc8LfjFduoPbo' }}
									defaultCenter={mapCenter}
									defaultZoom={11}
								>
								</GoogleMapReact>
							</div>
						</Col>
						<Col md="6" className="pl-md-5">
							<div className="main-image">
								<img src={property_images[selectedImage]?.image_path_url} />
							</div>
							<div className="img-list-wrapper clearfix">
								<span className="control-btn control-left" onClick={()=>moveCarousel(-1)}>
									<FontAwesomeIcon icon={fas.faAngleLeft} />
								</span>
								<div className="thumbnail-wrapper" style={{transform:`translateX(${-156*carouselNo}px)`}}>
								{
									property_images.map((_img, index)=>(
										<div className="img-item" key={index}>
											<img src={property_images[index].image_path_url} onClick={()=>setImage(index)}/>
										</div>
									))
								}
								</div>
								<span className="control-btn control-right" onClick={()=>moveCarousel(1)}>
									<FontAwesomeIcon icon={fas.faAngleRight} />
								</span>
							</div>
						</Col>
					</Row>
					<div className="contact-container mt-5 mb-5">
						<h2>Contact</h2>
						<div class="contact-banner">
							<div class="user-ps-bar">
								<div class="img-bar">
									<img src={contactImg} alt="" title=""/>
								</div>
								<div class="txt-info">
									<h5>Name Surname
									</h5>
									<p>email: name@enyuka.co.za
									</p>
									<p>Telephone: +27 83 998 5548
									</p>
								</div>
							</div>
							<div class="find-bar">
								<h3>Find out more
								</h3>
								<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
									sed diam nonummy nibh euismod tincidunt ut laoreet.</p>
								<div class="foot-wrap">
									<div class="form-bar">
										<form action="#" method="post">
											<label>
												<input type="text" name="name" placeholder="Name"/>
											</label>
											<label>
												<input type="email" name="email" placeholder="Email"/>
											</label>
											<label>
												<textarea name="message" cols="30" rows="1" placeholder="Message"></textarea>
											</label>
											<input type="submit" value="Contact us"/>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>
		</Layout>
	)
}

export const query = graphql`
	query($id: ID!, $property_category: String!, $suburb: String!) {
		property: allD9PropertyToLet(filter: {property_gmaven_key: {eq: $id}}) {
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
				property_responsibility {
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
		related: allD9PropertyToLet(filter: {property_gmaven_key: {ne: $id}, property_category: {eq: $property_category}, suburb: {eq: $suburb}}) {
			nodes {
				id
				property_gmaven_key
				property_name
				suburb
				min_gla
				max_gla
				gross_price
				net_price
				property_category
				best_image
			}
		}
	}
`