import React from 'react';
import SearchGifSearch from './SearchGifSearch.jsx';
import SearchGifGif from './SearchGifGif.jsx';

const GIPHY_API_URL = 'http://api.giphy.com';
const GIPHY_PUB_KEY = 'dc6zaTOxFJmzC';

class SearchGifApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            gif: {},
            searchingText: ''
        }

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(searchingText) {
        var self = this;
        self.setState({loading: true});
        self.getGif(searchingText, function(gif) {
                self.setState({
                    loading: false,
                    gif: gif,
                    searchingText: searchingText
                })
            }
        );
    }

    getGif(searchingText, cb) {
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var gif = JSON.parse(xhr.responseText).data;
                var gif = {
                    url: gif.fixed_width_downsampled_url,
                    sourceUrl: gif.url
                };
                console.log(gif);
                cb(gif);
            }
        };
        xhr.send();
    }

    render() {
        return (
            <div className={'gif-search'}>
                <SearchGifSearch onSearch={this.handleSearch}/>
                <SearchGifGif   loading={this.state.loading}
                                url={this.state.gif.url}
                                sourceUrl={this.state.gif.sourceUrl}/>
                <p>Search app in react powered by <a href={'http://api.giphy.com/'} target={'_blank'}>giphy API</a></p>
            </div>
        )
    }
}

export default SearchGifApp;