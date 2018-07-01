import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Link, Route } from 'react-router-dom';

import './Intro.scss';
import { Code } from './Code';

@inject('store') @observer
export class Intro extends React.Component {
  @observable tags = observable.array();
  @observable filters = observable.array();

  componentDidMount() {
    const { store } = this.props;
    store.getIntroItems()
      .then(
        () => {
          store.introItems.forEach(item => {
            item.tags.forEach(tag => {
              if (this.tags.includes(tag)) {
                return;
              }
              this.tags.push(tag);
            });
          });
        }
      );
  }

  toggleFilter = e => {
    const tag = e.target.getAttribute('data-tag');
    const index = this.filters.indexOf(tag);
    if (index !== -1) {
      this.filters.replace(this.filters.filter(f => f !== tag));
      return;
    }

    this.filters.push(tag);
  };

  render() {
    const { store } = this.props;
    return (
      <div className={'intro'}>
        <p>Welcome to my JavaScript sandbox. Have fun with:</p>
        <Route path="/code" component={Code} />
        {!store.introItemsLoading && (
          <div className={'intro__tags'}>
            <p className="small">filter by tags:</p>
            {this.tags
              .map(tag => (
                <span
                  style={{ cursor: 'pointer' }}
                  className={
                    this.filters.includes(tag) ? 'active' : 'inactive'
                  }
                  onClick={this.toggleFilter}
                  key={tag}
                  data-tag={tag}
                >
                  {tag}
                </span>
              ))
              .reverse()}
            {this.filters.length > 0 && (
              <p className="small">{`Mini-projects related to ${this.filters.join(
                ' OR ',
              )}:`}</p>
            )}
          </div>
        )}
        {store.introItemsLoading && <p>loading stuff...</p>}
        <ul>
          {store.introItems
            .slice(0)
            .filter(i => {
              if (this.filters.length === 0) {
                return true;
              }
              return this.filters.some(f => i.tags.includes(f));
            })
            .reverse()
            .map((item, index) => (
              <li key={index} className={'intro__link'}>
                {item.embed ? (
                  <Link to={`/code?url=${item.embed}`}>{item.title}</Link>
                ) : (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                )}
                <span className="descr">{item.details}</span>
                {item.repo && (
                  <span className="descr">
                    see also:{' '}
                    <a
                      className="repo"
                      href={item.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.repo}
                    </a>
                  </span>
                )}
                <div className={'intro__tags'}>
                  {item.tags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
