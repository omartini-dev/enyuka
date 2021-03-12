import React, { Component } from 'react';

import { connectStats } from 'react-instantsearch-dom';

import { StyledHeroSearch } from 'site/src/components/css';

class Stats extends Component {
  state = {
    hits: this.props.nbHits,
    time: this.props.processingTimeMS
  };

  componentDidMount() {
    if (this.state.hits !== this.props.nbHits) {
      this.setState({
        hits: this.props.nbHits,
        time: this.props.processingTimeMS
      })
    }
  }

  componentDidUpdate() {
    if (this.state.hits !== this.props.nbHits) {
      this.setState({
        hits: this.props.nbHits,
        time: this.props.processingTimeMS
      })
    }
  }

  render() {
    return (
      <StyledHeroSearch>

        <div>
          
          {/* <p>{this.state.hits} hits in {this.state.time} milliseconds</p> */}
          
          <p>Found {this.state.hits} results</p>
          
        </div>

      </StyledHeroSearch>
    )
  }
}

export default connectStats(Stats);