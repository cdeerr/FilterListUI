import React from 'react';
import axios from 'axios';

//let listPath;

const listDomain = 'http://localhost:50209/api/gameofthrones/';
const defaultEndpoint = 'houses';
// let listPath = 'http://localhost:50209/api/gameofthrones/books;
// let listPath = 'http://localhost:50209/api/gameofthrones/characters;

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseList: [],
            list: [],
            value: '',
            previousValue: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    fetchData = (endpoint) => {
        const listPath = listDomain + endpoint;
        axios.get(listPath)
          .then(response => {
            console.log("Response: " + JSON.stringify(response));
            this.setState({
                baseList: response.data,
                list: response.data
            });
          })
          .catch(error => {
              console.log(error);
          });
    }

    componentDidMount() {
        this.fetchData(defaultEndpoint);
    }

    mapList = () => {
        let listItems;
        if(this.state.list) {
            this.state.list.sort();
            listItems = this.state.list.map(item => {
                return (item && item.name) ? (
                    <li key={item.name}>
                        <div style={{'font-size': 1+'vw'}}>Name: {item.name}</div>
                    </li>
                ) : undefined;
            });
        }
         
        return (
            <ul id='dataList'>{listItems}</ul>
        );
    }

    handleChange = (event) => {
        event.preventDefault();
        let filteredItems;
        if(!event.target.value) {
            filteredItems = this.state.baseList;
        } else {
            filteredItems = this.state.baseList.filter(item => {
                return item.name.includes(event.target.value);
            });
        } 

        this.setState({
            list: filteredItems,
            value: event.target.value
        });
    }

    changeAndFetchList = event => {
        event.preventDefault();
        const endpoint = event.target.value.toLowerCase();
        //could be streamlined with a check to see if the same button was clicked twice, if so, don't make a GET request
        this.fetchData(endpoint);
    }

    render() {
        return (
            <div>
                <h1 style={{'fontSize': 3+'vw'}}>Search for Game of Thrones houses, books, or characters!</h1>
                <button
                  onClick={(event) => this.changeAndFetchList(event)}
                  value='houses'>
                  Houses
                </button>
                <button
                  onClick={(event) => this.changeAndFetchList(event)}
                  value='books'>
                  Books
                </button>
                <button
                  onClick={(event) => this.changeAndFetchList(event)}
                  value='characters'>
                  Characters
                </button>
                <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                {this.mapList()}
            </div>
        );
    }
}

export default Search;
