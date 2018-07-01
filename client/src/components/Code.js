import React from 'react';
import { runInAction, observable, when } from 'mobx';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import './Code.scss';

@inject('store') @observer
export class Code extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };
  @observable Component = null;
  @observable embed = null;
  @observable error = false;

  componentDidMount() {
    const embed = queryString.parse(this.props.location.search).url;
    const componentName = queryString.parse(this.props.location.search)
      .component;

    if (componentName) {
      runInAction(async () => {
        try {
          const ComponentProxy = await import(`./${componentName}`);
          this.Component = ComponentProxy[componentName];
        } catch (e) {
          this.error = true;
        }

      });
      return;
    }

    if (embed) {
      when(
        () => this.props.store.introItems.length,
        () => {
          if (this.props.store.introItems.some(item => item.embed === embed)) {
            runInAction(() => {
              this.embed = embed;
            });
          } else {
            runInAction(() => this.error = true)
          }
        }
      )
    }
  }

  render() {
    return (
      <div className="overlay">
        <div className="codeWrapper">
          <Link to={'/'} className="close">
            close
          </Link>
          {this.error && <p>an error occured</p>}
          {this.embed && (
            <iframe
              title={'code'}
              src={this.embed}
              frameBorder="0"
              height="100%"
              width="90%"
              sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
            />
          )}
          {this.Component && <this.Component />}
        </div>
      </div>
    );
  }
}
