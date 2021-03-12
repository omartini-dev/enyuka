import React from "react";
import { Link } from "gatsby";

import { Grid25, StyledForm } from "site/src/components/css";

var slugify = require('slugify');

const { makePersonPagePath } = require("people-plugin/src/components/utils/urlGenerator");
const { formatTelephone } = require("site/src/components/utils/telFormatter");

export default function Contacts({ contacts }) {

  if (contacts.length === 0) {

    return (
      <StyledForm>

        <div className="contactsBlock">

          <Grid25>

            <div className="contactDetails">
              <h5>{process.env.GATSBY_COMPANY_NAME}</h5>
              <p><a href={`tel:${process.env.GATSBY_COMPANY_TEL_1}`}>{formatTelephone(process.env.GATSBY_COMPANY_TEL_1)}</a></p>
              {/* <p><a href={`tel:${process.env.GATSBY_COMPANY_TEL_2}`}>{formatTelephone(process.env.GATSBY_COMPANY_TEL_2)}</a></p> */}
              <p><a href={`mailto:${process.env.GATSBY_COMPANY_EMAIL}`}>{process.env.GATSBY_COMPANY_EMAIL}</a></p>
            </div>

            <div className="contactImage">
              <img loading="lazy" src={process.env.GATSBY_COMPANY_LOGO_SQUARE} alt={process.env.GATSBY_COMPANY_NAME} />
            </div>

          </Grid25>

        </div>

      </StyledForm>
    )
  } else {

    return (

      <StyledForm>

        {
          contacts.map((contact, i) => {

            var name_slug = slugify(contact.name, {
              replacement: '-',
              remove: /[*+~.()'"!:@_,]/g,
              lower: true
            });

            return (
              <div className="contactsBlock" key={i}>

                <Grid25>

                  <div className="contactDetails">
                    <h5><Link to={makePersonPagePath({ slug: name_slug })}>{contact.name}</Link></h5>
                    <p>{contact.role}</p>
                    {contact.cell_number && (<p><a href={`tel:${contact.cell_number}`}>{formatTelephone(contact.cell_number)}</a></p>)}
                    {!contact.cell_number && (<p><a href={`tel:${process.env.GATSBY_COMPANY_TEL_1}`}>{formatTelephone(process.env.GATSBY_COMPANY_TEL_1)}</a></p>)}
                    <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                  </div>

                  <div className="contactImage">
                    <img loading="lazy" src={contact.image.replace("c_fill", "c_fill,g_face")} alt={contact.name} />
                  </div>

                </Grid25>

              </div>
            )
          })
        }

      </StyledForm>

    )
  }
}