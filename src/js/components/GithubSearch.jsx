import React from 'react';
import GithubSearchList from './GithubSearchList.jsx';

class GitHubSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            files: [],
            loading: false,
            zeroResult: false
        }
    }

    onSubmitHandle = (e) => {
        e.preventDefault();
        this.setState({
            loading: true,
            zeroResult: false
        });
        const {searchText} = this.state;
        const url = `https://api.github.com/search/code?q=${searchText}+in:file+language:js+language:jsx+user:patmaz`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    files: data.items,
                    loading: false
                });
                if (data.items.length === 0) {
                    this.setState({zeroResult: true});
                }
            });
    }

    onChangeHandle = (e) => {
        this.setState({searchText: e.target.value});
    }

    render() {
        return (
            <div className={'github-search'}>
                <h2>Search my js files on github</h2>
                <form onSubmit={this.onSubmitHandle}>
                  <label htmlFor="searchText">Type the phrase and press ENTER</label>
                  <input
                    type="text"
                    id="searchText"
                    onChange={this.onChangeHandle}
                    value={this.state.searchText}/>
                </form>
                {this.state.loading === true && <div className={'loader'}></div>}
                {this.state.zeroResult === true && <div className={'zero-result'}>Nope, try another phrase...</div>}
                {this.state.loading === false && <GithubSearchList files={this.state.files}/>}
            </div>
        )
    }
}

export default GitHubSearch;