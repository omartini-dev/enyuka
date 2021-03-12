import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import qs from 'qs';
import algoliasearch from 'algoliasearch/lite';

import { InstantSearch } from 'react-instantsearch-dom';

import PropTypes from 'prop-types';

import { FaSlidersH } from 'react-icons/fa';

import {
  SearchBox,
  ClearRefinementList,
  GLAMaxRefinementList,
  GLAMinRefinementList,
  PriceMaxRefinementList,
  PriceMinRefinementList,
  DealSwitch3,
  DealSwitch2,
  Stats,
  HeroRefinementList,
  HeroRefinementList2,
  Pagination,
  SearchResults,
} from './searchComponents';

import { orderBy } from 'lodash';

import { StyledPage, Grid2, Grid22, Grid4, Grid41, StyledSearch, StyledHeroSearch, StyledInput } from "site/src/components/css";

const appId = process.env.GATSBY_ALGOLIA_APP_ID;
const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY;
const searchClient = algoliasearch(appId, searchKey);

const updateAfter = 700;

const createURL = state => `?${qs.stringify(state)}`;

const searchStateToUrl = (props, searchState) =>
  searchState ? `${props.location.pathname}${createURL(searchState)}` : '';

const urlToSearchState = location => qs.parse(location.search.slice(1));

class App extends React.Component {

  state = {
    searchState: {
      sortBy: "ToLet"
    },
    loading: true,
    showFilter: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.setState({
        searchState: urlToSearchState(this.props.location)
      });
    }
    localStorage.setItem('searchState', JSON.stringify(this.state.searchState));
  }

  componentDidMount() {

    this.setState({
      loading: false
    })

    //Empty URL
    if (this.props.type === "main" && this.props.location.search === "") {

      //Check if local stoage exists
      if (localStorage.getItem('searchState')) {

        //set searchState from localStorage
        this.setState({
          searchState: JSON.parse(localStorage.getItem('searchState'))
        })

        //Update URL
        this.props.navigate(
          searchStateToUrl(this.props, JSON.parse(localStorage.getItem('searchState'))),
          JSON.parse(localStorage.getItem('searchState'))
        );
      } else {

        //Set state initially declared
        this.setState({ searchState: this.state.searchState });

        //Update localStorage
        localStorage.setItem('searchState', JSON.stringify(this.state.searchState));
      }
    }

    //Non-empty URL
    if (this.props.type === "main" && this.props.location.search !== "") {

      //Set state from URL
      this.setState({
        searchState: urlToSearchState(this.props.location)
      });

      //Update localStorage
      localStorage.setItem('searchState', JSON.stringify(this.state.searchState));

    }

    //Hero
    if (this.props.type === "hero" && localStorage.getItem('searchState')) {

      this.setState({
        searchState: JSON.parse(localStorage.getItem('searchState'))
      })
    }

    this.interval = setInterval(
      () =>
        this.setState({ refresh: true }, () => {
          this.setState({ refresh: false });
        }),
      process.env.GATSBY_ALGOLIA_INTERVAL_MILLISEC
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSearchStateChange = searchState => {

    clearTimeout(this.debouncedSetState);

    this.debouncedSetState = setTimeout(() => {
      if (this.props.type === "main") {

        this.props.navigate(
          searchStateToUrl(this.props, searchState),
          searchState
        );

      }
    }, updateAfter);
    this.setState({ searchState });
    localStorage.setItem('searchState', JSON.stringify(this.state.searchState));
  };

  render() {

    return (

      <InstantSearch
        searchClient={searchClient}
        indexName={this.state.searchState.sortBy || "ToLet"}
        searchState={this.state.searchState}
        onSearchStateChange={this.onSearchStateChange}
        createURL={createURL}
        refresh={this.state.refresh}
      >

        <form autoComplete="off">

          {
            this.props.type === "main" && (

              <StyledSearch>

                {/* <LoadingIndicator /> */}

                <div className="primarySearch">

                  <StyledPage>

                    <div className="container">

                      {/* Page meta data (title, description, etc.)*/}

                      <StyledInput>

                        <div className="searchBox hero">

                          <SearchBox
                            showLoadingIndicator
                          />

                        </div>

                      </StyledInput>

                      <div className={`filterContainer ${this.state.showFilter}`}>

                        <div className="filterContainerInner">

                          <button onClick={(e) => { e.preventDefault(); this.setState({ showFilter: false }) }} className="filterToggleClose">X</button>

                          <div className="dealFilters">

                            <DealSwitch3
                              defaultRefinement="ToLet"
                              items={[
                                { value: 'ToLet' },
                                { value: 'ForSale' },
                              ]}
                            />

                          </div>

                          <div className="searchFilters">

                            <div className="searchBox hero mobile">
                              <SearchBox
                                showLoadingIndicator
                              />
                            </div>

                            <Grid2>

                              <HeroRefinementList
                                attribute="suburb_cluster"
                                placeholder="Search by suburb"
                                transformItems={items => orderBy(items, "label", "asc")}
                                limit={100}
                              />

                              <HeroRefinementList
                                attribute="property_category"
                                placeholder="Property type"
                                transformItems={items => orderBy(items, "label", "asc")}
                              />

                            </Grid2>

                            <Grid4>

                              <GLAMinRefinementList
                                attribute="min_gla"
                                min={0}
                                max={10000000000}
                                deal={this.state.searchState.sortBy || "ToLet"}
                              />
                              <GLAMaxRefinementList
                                attribute="max_gla"
                                min={0}
                                max={10000000000}
                                deal={this.state.searchState.sortBy || "ToLet"}
                              />
                              <PriceMinRefinementList
                                attribute="gross_price"
                                min={0}
                                max={10000000000}
                                deal={this.state.searchState.sortBy || "ToLet"}
                              />
                              <PriceMaxRefinementList
                                attribute="gross_price"
                                min={0}
                                max={10000000000}
                                deal={this.state.searchState.sortBy || "ToLet"}
                              />

                              <Grid22>

                                <button className="mainSearchButton" onClick={(e) => { e.preventDefault(); this.setState({ showFilter: false }) }}>Search</button>

                                <ClearRefinementList
                                  clearsQuery
                                />

                              </Grid22>

                            </Grid4>


                          </div>


                          <div className="primaryStats">
                            <Stats filters={this.state.searchState} />
                          </div>

                        </div>

                      </div>

                      <div className="filterBtnContainer">

                        <button onClick={(e) => { e.preventDefault(); this.setState({ showFilter: !this.state.showFilter }) }} className="filterToggle">Filter <FaSlidersH /></button>

                      </div>

                    </div>

                  </StyledPage>

                </div>

                {
                  !this.state.loading && (

                    <StyledPage>

                      <SearchResults type={this.state.searchState.sortBy || "ToLet"} />

                    </StyledPage>

                  )
                }
                {
                  this.state.loading && (

                    <StyledPage>

                      <div className="loader"></div>

                    </StyledPage>

                  )
                }

                <StyledPage>

                  <Pagination />

                </StyledPage>

              </StyledSearch>
            )
          }

          {/* Hero search */}

          {
            this.props.type === "hero" && (

              <StyledHeroSearch>

                {
                  !this.state.loading && (

                    <Fragment>

                      <div className="searchBox hero">
                        <SearchBox
                          showLoadingIndicator
                        />
                      </div>

                      <div>
                        <Stats filters={this.state.searchState} />
                      </div>

                      <div className="heroFilters">

                        <Grid41>

                          <DealSwitch2
                            defaultRefinement="ToLet"
                            items={[
                              { value: 'ToLet' },
                              { value: 'ForSale' },
                            ]}
                          />

                          <HeroRefinementList2
                            attribute="suburb_cluster"
                            placeholder="Suburb"
                            transformItems={items => orderBy(items, "label", "asc")}
                            limit={100}
                          />

                          <HeroRefinementList2
                            attribute="property_category"
                            placeholder="Category"
                            transformItems={items => orderBy(items, "label", "asc")}
                          />

                          <div>
                            <Link to="/listings/search"><button>Search</button></Link>
                          </div>

                        </Grid41>

                      </div>

                    </Fragment>

                  )
                }

                {
                  this.state.loading && (

                    <div className="loader"></div>

                  )
                }


              </StyledHeroSearch>

            )
          }

        </form>

      </InstantSearch>

    )
  }
}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  })
};

export default App;