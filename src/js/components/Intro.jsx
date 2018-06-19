import React from 'react';
import axios from 'axios';

import { Monitor } from './Monitor.jsx';
import { About } from './About.jsx';

class Intro extends React.Component {
    state = {
        items: [],
        loading: true,
        tags: [],
        filters: [],
    };

    componentDidMount() {
        axios.get('/intro').then(data => {
            this.setState({
              items: data.data,
              loading: false,
            });

            this.state.items.forEach(item => {
                item.tags.forEach(tag => {
                    if (this.state.tags.includes(tag)) {
                        return;
                    }
                this.setState({
                    tags: [
                        ...this.state.tags,
                        tag
                    ]
                });
              })
            })
        });
    }

  toggleFilter = e => {
      const tag = e.target.getAttribute('data-tag');
      const index = this.state.filters.indexOf(tag);
      if (index !== -1) {
        this.setState({
          filters: this.state.filters.filter(f => f !== tag)
        });
        return;
      }

      this.setState({
          filters: [
              ...this.state.filters,
              tag
          ]
      });
  };

      render() {
          const { items, loading } = this.state;
          return (
              <div className={'intro'}>
                  <p>Welcome to my JavaScript sandbox. Have fun with:</p>
                  {!loading &&
                      <div className={'intro__tags'}>
                          <p className="small">filter by tags:</p>
                          {this.state.tags.map(tag =>
                              <span
                                  style={{ cursor: 'pointer' }}
                                  className={this.state.filters.includes(tag) ? 'active' : 'inactive'}
                                  onClick={this.toggleFilter}
                                  key={tag}
                                  data-tag={tag}>
                                  {tag}
                              </span>
                          ).reverse()}
                      </div>
                  }
                  {loading &&
                      <p>loading stuff...</p>}
                  <ul>
                      {
                          items
                              .slice(0)
                              .filter(i => {
                                  if (this.state.filters.length === 0) {
                                    return true;
                                  }
                                  return this.state.filters.some(f => i.tags.includes(f));
                              })
                              .reverse()
                              .map((item, index) =>
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