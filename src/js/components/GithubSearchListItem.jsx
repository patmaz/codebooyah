import React from 'react';

class GitHubSearchListItem extends React.Component {
    render() {
        return (
            <li className={'github-search__list-item'}>
                <h3>{this.props.file.name}</h3>
                <p><a href={this.props.file.html_url} target={'_blank'}>{this.props.file.path}</a> from <a href={this.props.file.repository.html_url} target={'_blank'}>{this.props.file.repository.full_name}</a></p>
            </li>
        )
    }
    static defaultProps = {
        file: {}
    }

    static propTypes = {
        file: React.PropTypes.object.isRequired,
    }
}

export default GitHubSearchListItem;