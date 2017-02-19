import React from 'react';
import SearchGifSearch from './SearchGifSearch.jsx';
import SearchGifGif from './SearchGifGif.jsx';

const GIPHY_API_URL = 'https://api.giphy.com';
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
        this.getPromise = this.getPromise.bind(this);
    }

    handleSearch(searchingText) {
        this.setState({loading: true});
        this.getGif(searchingText,
            (gif) => {
                this.setState({
                    loading: false,
                    gif: gif,
                    searchingText: searchingText
                });
            }
        );
    }

    getPromise(url) {
        return new Promise(
            (resolve, reject) => {
                const req = new XMLHttpRequest();

                req.onload = () => {
                    // console.log(this);
                    if(req.status === 200){
                        resolve(req.response);
                    } else {
                        reject(new Error(req.statusText));
                    }
                }

                // req.onload = function(){
                //     console.log(this);
                //     if(this.status === 200){
                //         resolve(this.response);
                //     } else {
                //         reject(new Error(this.statusText));
                //     }
                // }

                req.onerror = () => {
                    reject(new Error(`XMLHttpRequest Error: ${req.statusText}`));
                }

                req.open('GET', url);
                req.send();
            }
        );
    }

    getGif(searchingText, cb) {
        const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;

        const promise = this.getPromise(url);
        promise
            .then(data => {
                let gif = JSON.parse(data).data;
                gif = {
                    url: gif.fixed_width_downsampled_url,
                    sourceUrl: gif.url
                };
                cb(gif);
            })
            .catch(err => console.log(err));
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