import React from 'react';
import GithubSearchListItem from './GithubSearchListItem.jsx';

class GitHubSearchList extends React.Component {
    render() {
        return (
            <ul className={'github-search__list'}>
                {this.props.files.map((file, index) => <GithubSearchListItem key={index} file={file} />)}
            </ul>
        )
    }

    static defaultProps = {
        files: []
    }

    static propTypes = {
        files: React.PropTypes.array.isRequired
    }

}

export default GitHubSearchList;