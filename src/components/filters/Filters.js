import React, { Component } from 'react';
import Locality from './locality/Locality';

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locDataStatus: false,
        }
    }

    filteredData = {
        "sort": {
            'popularity': {},
            'rating': {},
            'costLH': {},
            'costHL': {},
        },
        'locality': {},
    };


    // filters for sorting
    dataFilter = (rest) => {

        this.filteredData.sort.popularity = [...rest];
        this.filteredData.sort.rating = [...rest];
        this.filteredData.sort.costLH = [...rest];
        this.filteredData.sort.costHL = [...rest];

        // sorting algorithm
        this.filteredData.sort.popularity.sort((a, b) => parseInt(b.restaurant.user_rating.votes) - parseInt(a.restaurant.user_rating.votes));
        this.filteredData.sort.rating.sort((a, b) => parseFloat(b.restaurant.user_rating.aggregate_rating) - parseFloat(a.restaurant.user_rating.aggregate_rating));
        this.filteredData.sort.costLH.sort((a, b) => parseInt(a.restaurant.average_cost_for_two) - parseInt(b.restaurant.average_cost_for_two));
        this.filteredData.sort.costHL.sort((a, b) => parseInt(b.restaurant.average_cost_for_two) - parseInt(a.restaurant.average_cost_for_two));
        console.log('filters created');

    }

    // accepted locality data 
    getLocality = (locData) => {
        this.filteredData.locality = locData;
        this.setState({ ...this.state, locDataStatus: !this.state.locDataStatus })
    };

    // sending data to main page 
    sendFilteredData = () => {
        this.props.mainPageCallback(this.filteredData);
        console.log('filters sended');
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.res !== this.props.res) {
            this.dataFilter(this.props.res);
        }
        if ((prevProps.res !== this.props.res) || (prevState.locDataStatus !== this.state.locDataStatus)) {
            this.sendFilteredData();
        }
    }

    // just for showing in console
    popularitySort = () => {
        console.log(this.filteredData.sort.popularity);
        console.log('Popularity:-');
        (() => this.filteredData.sort.popularity.filter((a) => {
            console.log(a.restaurant.name, a.restaurant.user_rating.votes);
        }))();
    }

    // just for showing in console
    ratingSort = () => {
        console.log(this.filteredData.sort.rating);
        console.log('Rating:-');
        (() => this.filteredData.sort.rating.filter((a) => {
            console.log(a.restaurant.name, a.restaurant.user_rating.aggregate_rating);
        }))();
    }

    // just for showing in console
    costLowToHighSort = () => {
        console.log(this.filteredData.sort.costLH);
        console.log('Cost Low to High:-');
        (() => this.filteredData.sort.costLH.filter((a) => {
            console.log(a.restaurant.name, a.restaurant.average_cost_for_two);
        }))();
    }

    // just for showing in console
    costHighToLowSort = () => {
        console.log(this.filteredData.sort.costHL);
        console.log('Cost High to Low:-');
        (() => this.filteredData.sort.costHL.filter((a) => {
            console.log(a.restaurant.name, a.restaurant.average_cost_for_two);
        }))();
    }

    render() {

        return (
            <div>
                <div>Filters</div>
                <div><div>Sort By</div>
                    <button onClick={this.popularitySort}>Popularity</button>
                    <button onClick={this.ratingSort}>Rating</button>
                    <button onClick={this.costLowToHighSort}>Cost-Low to High</button>
                    <button onClick={this.costHighToLowSort}>Cost-High to Low</button>
                </div>

                <Locality res={this.props.res} filtersCallback={this.getLocality}></Locality>
            </div>

        );
    }
}

export default Filters;