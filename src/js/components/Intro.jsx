import React from 'react';
import axios from 'axios';

import { Monitor } from './Monitor.jsx';
import { About } from './About.jsx';

class Intro extends React.Component {
    state = {
        items: [],
        loading: true,
    };

    componentDidMount() {
        axios.get('/intro').then(data => {
            this.setState({
              items: data.data,
              loading: false,
            });
        });
    }

    render() {
        const { items, loading } = this.state;
        return (
            <div className={'intro'}>
                <p>Welcome to my JavaScript sandbox. Have fun with:</p>
                {loading &&
                    <p>loading stuff...</p>}
                <ul>
                    {
                        items.slice(0).reverse().map((item, index) =>
                            <li key={index}
                                className={'intro__link'}
                            >
                                <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                                <span className="descr">{item.details}</span>
                                {item.repo && <span className="descr">see also: <a className="repo" href={item.repo} target="_blank" rel="noopener noreferrer">{item.repo}</a></span>}
                                <div className={'intro__tags'}>
                                    {item.tags.map((tag, index) =>
                                        <span key={index}>{tag}</span>
                                    )}
                                </div>
                            </li>
                        )
                    }
                </ul>
              <Monitor/>
              <About/>
            </div>
        )
    }
}

export default Intro;