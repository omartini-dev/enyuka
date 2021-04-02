import React from "react"
import { Link } from "gatsby"
import "../css/app.css"
import "../css/font.css"
import "../css/style.css"
import "../css/home.css"
import { Container, Row, Col } from 'react-bootstrap';
import Layout from "../components/layout"
import contactImg from "../images/contact.jpg"

const Contact = () => {
	return (
		<Layout slug="contact">
			<Container className="contact-wrapper">
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
		</Layout>
	)
}

export default Contact
