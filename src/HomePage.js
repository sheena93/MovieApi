import React, { Component } from 'react';


import request from 'request';
import {
  Grid,
  Row,
  Col,
  PageHeader,

} from 'react-bootstrap';
// https://reactstrap.github.io/components/
import {
  Card,
  CardImg, CardText, CardBody,
  CardTitle, CardSubtitle ,
  Input,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
  Label,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

const imageUrl = require(`./Images/white.jpeg`)

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.loadTopRatedMovies = this.loadTopRatedMovies.bind(this);
    this.updateState = this.updateState.bind(this);
    this.triggerSearch = this.triggerSearch.bind(this);
    this.state={
      'isTopRatedMoviesLoaded' : false,
      'topRatedMoviesList' : undefined,
      'istopRatedShowsListLoaded' : false,
      'topRatedShowsList' : undefined,
      'searchResult':'searching',
      'isSearchSuccess':false,
    };
  }

  updateState(data){
    this.setState(()=>{
      return Object.assign({},data);
    });
  }

  loadTopRatedMovies(){
    var page ='1';
    var updateState = this.updateState;
    var options = { method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/top_rated',
      qs: { page: page, language: 'en-US', api_key: '8674492b756e68ce979a14b5e849855e' },
      body: '{}' };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      // console.log(body);
      updateState({
        'isTopRatedMoviesLoaded' : true,
        'topRatedMoviesList':body
      });
      return body;
    });
  }

  loadTopLikedMovies(){
    var page ='1';
    var updateState = this.updateState;
    var options = { method: 'GET',
      url: 'https://api.themoviedb.org/3/tv/top_rated',
      qs: { page: page, language: 'en-US', api_key: '8674492b756e68ce979a14b5e849855e' },
      body: '{}' };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      // console.log(body);
      updateState({
        'isTopLikedMoviesLoaded' : true,
        'topRatedShowsList':body
      });
      return body;
    });
  }

  getListForSearchQuery(searchText='dil'){
    var updateState = this.updateState;
    var options = { method: 'GET',
      url: 'https://api.themoviedb.org/3/search/keyword',
      qs:
       { page: '1',
         query: searchText,
         api_key: '8674492b756e68ce979a14b5e849855e' },
      body: '{}' };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      updateState({
        'searchResult':body,
        'isSearchSuccess':true,
      });
    });
  }

  triggerSearch(event){
    let minLength=3;
    this.updateState({
      'searchText':event.target.value,
    });
    if(event.target.value.length>minLength){
      this.getListForSearchQuery(event.target.value)
    };
  }

  componentWillMount(){
    this.loadTopRatedMovies();
    this.loadTopLikedMovies();
  }

  hide(event){
    console.log("hide");
    let showSearchResult = document.querySelector("#showSearchResult");
    if(showSearchResult){ // not null
      showSearchResult.style.display = 'none';
    }
  }

  componentDidMount(){
    console.log(this.state.isSearchSuccess);
    if(this.state.isSearchSuccess){  // only then showSearchResult is in dom
      document.addEventListener('click',this.hide);
      let showSearchResult = document.querySelector("#showSearchResult");
      showSearchResult.addEventListener('click',(event)=>{
        event.stopPropagation();
      });
    }
  }

  componentWillUnmount(){
    document.removeEventListener('click',this.hide);
  }

  render(){
    let topRatedMoviesGroup = this.state.isTopRatedMoviesLoaded ? (<TopRatedMoviesGroup topRatedMoviesGroupInfo={this.state} />) :  (<div>Loading..</div>) ;
    let topRatedShowsGroup=  this.state.isTopLikedMoviesLoaded ? (<TopRatedShowsGroup topRatedShowsList={this.state.topRatedShowsList} />) :  (<div>Loading..</div>) ;
    return (
      <Grid style={{ backgroundImage: `url(${imageUrl})` }}>
    		<Row className="show-grid">
    			<Col xs={12} md={8}>
            <PageHeader>
      		      MOVIES STACK
      	    </PageHeader>
    			</Col>
    			<Col xs={6} md={4}>
    			</Col>
    		</Row>

    		<Row className="show-grid" id='multiSearchBar'>
          <Col xs={6} md={2}>
          </Col>
    			<Col xs={6} md={5}>
               <Input type="search" name="search" id="multiSearch"  onChange={this.triggerSearch} placeholder="search..." />
               {
                 this.state.isSearchSuccess?(<ListGroup id='showSearchResult'><SearchResultList searchResponse={this.state.searchResult} /></ListGroup>):(<span></span>)
               }
    			</Col>
    			<Col xs={6} md={5}>
    			</Col>
    		</Row>

        <Row className="show-grid">
          <Col xs={6} md={6}>
            <h4>
              TOP RATED MOVIES
          	</h4>
            {
              topRatedMoviesGroup
            }
          </Col>
          <Col xs={6} md={6}>
            <h4>
          		TOP RATED SHOWS
          	</h4>
            {
              topRatedShowsGroup
            }
          </Col>
        </Row>

    		{/* <Row className="show-grid">
    			<Col xs={6} xsOffset={6}>
    				<Button onClick={this.loadTopRatedMovies}>load</Button>
    			</Col>
    		</Row> */}

    		<Row className="show-grid" className="footer">
    			<Col md={6} mdPush={6}>
            <Card>
              <CardBody>
                <CardImg top src="https://www.themoviedb.org/static_cache/v4/logos/408x161-powered-by-rectangle-green-bb4301c10ddc749b4e79463811a68afebeae66ef43d17bcfd8ff0e60ded7ce99.png" width="408" height="161"/>
              </CardBody>
            </Card>
          </Col>
    			<Col md={6} mdPull={6}>
    			</Col>
    		</Row>
    	</Grid>
    );
  }
}

const ThumbnailInstance = (props)=>(
  <div>
      <Card>
        <CardBody>
          <CardTitle>{props.movie.title}</CardTitle>
        </CardBody>
        <CardImg top width="200px" height='200px' src={"https://image.tmdb.org/t/p/w185_and_h278_bestv2/"+props.movie.poster_path } alt="Card image cap" />
        <CardBody>
          <CardSubtitle>{props.movie.original_title}</CardSubtitle>
          <CardText>{props.movie.overview}</CardText>
        </CardBody>
      </Card>
  </div>
);

const TopRatedMoviesGroup =(props)=>{
  var topRatedMoviesArray = JSON.parse(props.topRatedMoviesGroupInfo['topRatedMoviesList']);
  var results = topRatedMoviesArray['results'];
  var topRatedMoviesList = getMoviesThumbnailList(results);

  return (
    <ListGroup id="ratedMoviesList" >
      {topRatedMoviesList}
    </ListGroup>
  );
};
const TopRatedShowsGroup =(props)=>{
  var topRatedShowsList = JSON.parse(props.topRatedShowsList);
  var results = topRatedShowsList['results'];
  var topRatedShows = getMoviesThumbnailList(results);

  return (
    <ListGroup id="topRatedShows" >
      {topRatedShows}
    </ListGroup>
  );
};


function getMoviesThumbnailList(movieData){
  return movieData.map((movie)=>{
      return (
        <ListGroupItem key={movie.id}>
          <ThumbnailInstance  movie={movie}/>
        </ListGroupItem>
      );
    });
}
// SearchResultList searchResult=body
function SearchResultList(props){

  let maxLen = 6 ; // max list of elements to shoew
  let searchResponse = JSON.parse(props.searchResponse);
  if(searchResponse.total_results==0){ // No results
    return <ListGroupItem  tag="button" action>No results</ListGroupItem>;
  }

  let searchResult = searchResponse.results;
  if(searchResult.length>maxLen){
    searchResult = searchResult.slice(0,maxLen);
  }
  return searchResult.map((result)=>{
    return <ListGroupItem key={result.id} tag="button" action>{result.name}</ListGroupItem>;
  });

}

export default HomePage;
