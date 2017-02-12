import React from 'react';

class SearchGifSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchTerm: ''};

        this.changeHandler = this.changeHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
    }

    changeHandler(e) {
        var searchTerm = e.target.value;
        this.setState({searchTerm : searchTerm});
        this.props.onSearch(searchTerm);
    }

    keyUpHandler(e) {
        if (e.keyCode === 13) {
            this.props.onSearch(this.state.searchTerm);
        }
    }

    render() {
        return (
            <div className="gif-search__search">
                <input  className="input__field"
                        type="text"
                        placeholder={'search for gif'}
                        onChange={this.changeHandler}
                        onKeyUp={this.keyUpHandler}
                        value={this.state.searchTerm}/>
            </div>
        )
    }
}

export default SearchGifSearch;