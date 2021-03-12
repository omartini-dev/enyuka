import React from 'react';

import * as GTAG from 'site/src/components';

class PDF extends React.Component {
  state = {
    enabled: false,
    loading: false,
    success: false,
  };

  //Property to let
  createPropLetPdf = () => {
    const axios = require('axios');
    const unitIds = this.props.data.map(unitId => {
      return unitId.gmaven_mapped_key;
    }).join(",");
    this.setState(
      {
        enabled: true,
        success: false,
        loading: true,
      }
    )
    axios.post('https://www.gmaven.com/api/data/report/v2/LeasingBrochure',
      {
        propertyUnitIds: unitIds,
        propertyDomainKey: this.props.data[0].property_gmaven_key,
        reportType: process.env.GATSBY_PROP_LEASING_BROCHURE,
        userDomainKey: this.props.data[0].property_responsibility && this.props.data[0].property_responsibility.length > 0 ? this.props.data[0].property_responsibility[0].gmaven_contact_key : null
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'gmaven.apiKey': process.env.GATSBY_GMAVEN_API
        },
        responseType: 'blob',
      }
    )
      .then(response => {

        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${this.props.data[0].property_name}.pdf`);
          document.body.appendChild(link);
          link.click();
          this.setState(
            {
              enabled: true,
              success: true,
              loading: false,
            }
          )
          GTAG.event({
            category: 'PDF',
            action: 'property_pdf_download',
            label: this.props.data[0].property_name
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  //Unit to let
  createUnitLetPdf = () => {

    const axios = require('axios');
    this.setState(
      {
        enabled: true,
        success: false,
        loading: true,
      }
    )
    axios.post('https://www.gmaven.com/api/data/report/v2/UnitLeasingBrochure',
      {
        propertyDomainKey: this.props.data[0].property_gmaven_key,
        propertyUnitId: this.props.data[0].gmaven_mapped_key,
        reportType: process.env.GATSBY_UNIT_LEASING_BROCHURE,
        userDomainKey: this.props.data[0].unit_responsibility && this.props.data[0].unit_responsibility.length > 0 ? this.props.data[0].unit_responsibility[0].gmaven_contact_key : null      
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'gmaven.apiKey': process.env.GATSBY_GMAVEN_API
        },
        responseType: 'blob',
      }
    )
      .then(response => {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${this.props.data[0].property_name}.pdf`);
          document.body.appendChild(link);
          link.click();
          this.setState(
            {
              enabled: true,
              success: true,
              loading: false,
            }
          )
          GTAG.event({
            category: 'PDF',
            action: 'unit_pdf_download',
            label: this.props.data[0].property_name
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  //Property for sale
  createPropSalePdf = () => {

    const axios = require('axios');
    this.setState(
      {
        enabled: true,
        success: false,
        loading: true,
      }
    )
    axios.post('https://www.gmaven.com/api/data/report/v2/SalesBrochure',
      {
        reportName: "SalesBrochure",
        text: "Sales brochure",
        includeYieldOnAcuisition: true,
        includeAskingPerSqm: true,
        includeVacantGla: true,
        includeStreetAddress: true,
        propertyDomainKey: this.props.data[0].gmaven_mapped_key,
        reportType: process.env.GATSBY_PROP_SALES_BROCHURE,
        userDomainKey: this.props.data[0].property_responsibility && this.props.data[0].property_responsibility.length > 0 ? this.props.data[0].property_responsibility[0].gmaven_contact_key : null
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'gmaven.apiKey': process.env.GATSBY_GMAVEN_API
        },
        responseType: 'blob',
      }
    )
      .then(response => {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${this.props.data[0].property_name}.pdf`);
          document.body.appendChild(link);
          link.click();
          this.setState(
            {
              enabled: true,
              success: true,
              loading: false,
            }
          )
          GTAG.event({
            category: 'PDF',
            action: 'sale_pdf_download',
            label: this.props.data[0].property_name
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {

    //template selection
    var pdfTemplate = null;
    if (this.props.pdf === "propertyToLet") {
      pdfTemplate = this.createPropLetPdf
    }

    if (this.props.pdf === "propertyUnitToLet") {
      pdfTemplate = this.createUnitLetPdf;
    }

    if (this.props.pdf === "propertyForSale") {
      pdfTemplate = this.createPropSalePdf;
    }

    const { loading, success } = this.state;
    return (
      <div>

        {this.props.type !== "property_unit" && (

          <button className="brochureButton" onClick={pdfTemplate} disabled={this.state.enabled}>

            {loading ? "loading..." : "PDF download"}

          </button>

        )}


        {loading && (
          <p><i>This may take a while, feel free to continue browsing while we create your brochure.</i></p>
        )}


        {success && (
          <p>Your brochure is ready!</p>
        )}

      </div>
    )
  }
}

export default PDF