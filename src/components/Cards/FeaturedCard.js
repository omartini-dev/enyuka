import React, {useState} from "react"
import styled from "styled-components"

const FeaturedCard = ({data}) => {
	const [activeImg, setActiveImg] = useState(0)
	return (
	<CardContainer>
		<div className="featured-image">
			{
				data?.property_images && data?.property_images.slice(0,5).map((_img, index)=>(
					<>
					<img src={_img?.image_path_url} key={index} className={activeImg===index?'active':''} />
					<span 
						className={`img-anchor anchor-${(index - (data?.property_images.slice(0,5).length-1)/2)*2} ${activeImg===index?'active':''}`}
						onClick={()=>setActiveImg(index)}></span>
					</>
				))
			}
		</div>
		<div className="property-desc">
			<h5>{data?.property_name}</h5>
			<div className="property-address">
				<span>{data?.street_address}, </span>
				<span>{data?.suburb}, </span>
				<span>{data?.city}, </span>
				<span>{data?.province}</span>
			</div>
			<div className="tenant">
				<span>Anchor tenant: </span>
				<span></span>
			</div>
		</div>
	</CardContainer>
	)
}
export default FeaturedCard

const CardContainer = styled.div`
	box-shadow: 0 0 15px 7px #00000027;
	border-radius: 30px;
	height:100%;
	overflow:hidden;
	.featured-image{
		height:230px;
		position:relative;
		img{
			width:100%;
			height:100%;
			object-fit:cover;
			object-position:center;
			position:absolute;
			opacity:0;
			&.active{
				opacity:1;
			}
		}
		.img-anchor{
			position:absolute;
			top:20px;
			left:50%;
			z-index:20;
			display:block;
			width:8px;
			height:8px;
			background:#111;
			border-radius:50%;
			opacity:0;
			cursor: pointer;
			&:hover,
			&.active{
				background:#fff;
			}
		}
	}
	&:hover{
		.img-anchor{
			opacity:1;
			&.anchor--4{
				transform:translateX(-32px);
			}
			&.anchor--3{
				transform:translateX(-24px);
			}
			&.anchor--2{
				transform:translateX(-16px);
			}
			&.anchor--1{
				transform:translateX(-8px);
			}
			&.anchor-1{
				transform:translateX(8px);
			}
			&.anchor-2{
				transform:translateX(16px);
			}
			&.anchor-3{
				transform:translateX(24px);
			}
			&.anchor-4{
				transform:translateX(32px);
			}
		}
	}
	.property-desc{
		padding: 35px 35px 30px 60px;
		@media (max-width: 1200px) {
			padding: 30px;
		}
		
    font-size: 16px;
		h5{
			margin: 0 0 25px 0;
			font-weight: 700;
			color: #2c2727;
			font-size:13px;
			text-transform:uppercase;
		}
		.property-address{
			font-size:14px;
			margin-bottom:20px;
			max-width:270px;
			span{
				color: #2c2727;
			}
		}
		.tenant{
			font-size:14px;
			span{
				color: #2c2727;
			}
		}
	}
`