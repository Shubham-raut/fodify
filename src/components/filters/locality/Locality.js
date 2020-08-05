import React, { Component } from 'react';

class Locality extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    dataStore = {};
    items = [];

    // filter according to locality
    locality = () => {
        let localitySetObj = (key, value) => {
            if (!(key in this.dataStore)) {
                this.dataStore[key] = [value];
            }
            else {
                this.dataStore[key] = [...this.dataStore[key], value];
            }
        }

        this.props.res.forEach(a => {
            let loc = (a.restaurant.location.locality).split(', ');
            let resID = a.restaurant.R.res_id;
            for (let i of loc) {
                localitySetObj(i, resID);
            }
        });
    }

    // just for showing in console
    localityHandlor = (e) => {
        console.log(e.target.value, this.dataStore[e.target.value]);
    }

    // for sending data to Filters Component
    sendLocality = () => {
        this.props.filtersCallback(this.dataStore);
    }

    render() {
        this.locality();
        this.sendLocality();
        // console.log('Locality', this.dataStore);

        // for creating buttons
        for (let k in this.dataStore) {
            this.items.push(<button value={k} onClick={this.localityHandlor}>{k}</button>)
        }

        return (
            <div>
                <div>Location</div>
                <div>{this.items}</div>
            </div>
        );
    }
}

export default Locality;
