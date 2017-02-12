import React from 'react';

const GIPHY_LOADING_URL = 'http://www.ifmo.ru/images/loader.gif';

class SearchGifGif extends React.Component {
    getUrl() {
        return this.props.sourceUrl || GIPHY_LOADING_URL;
    }

    render() {
        var url = this.props.loading ? GIPHY_LOADING_URL : this.props.url;

        return (
            <div className={'gif-search__gif'}>
                <a href={this.getUrl()} target='_blank'>
                    <img id='gif' src={url} />
                </a>
            </div>
        )
    }
}

export default SearchGifGif;