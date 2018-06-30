import React from 'react';
import { observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import axios from 'axios';
import urlsafeBase64 from 'urlsafe-base64';
import './Notifications.scss';

@observer
export class Notifications extends React.Component {
  @observable status = '...';

  subscribeUser = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(reg => {
        reg.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlsafeBase64.decode(
              'BNfDApgKGqXDksw3ciyLFKjT2wAuAAORTKNezU8UcfRFVajRWfkshop8G0_A31TfEbbp-7nkY-su-hfRtoiu3lU',
            ),
          })
          .then(sub => {
            runInAction(() => {
              this.status = 'new subscription saved';
            });
            this.checkSubscription();
          })
          .catch(err => {
            if (Notification.permission === 'denied') {
              runInAction(() => {
                this.status = 'permission for notifications was denied';
              });
            } else {
              runInAction(() => {
                this.status = 'unable to subscribe';
              });
            }
          });
      });
    }
  };

  checkSubscription = () => {
    try {
      if ('Notification' in window && navigator.serviceWorker) {
        if (Notification.permission !== 'granted')
          Notification.requestPermission();

        navigator.serviceWorker
          .register('/sw')
          .then(reg => {
            reg.pushManager.getSubscription().then(sub => {
              if (sub === null) {
                this.subscribeUser();
              } else {
                axios
                  .post('api/push/sub', {
                    sub: sub,
                    key: localStorage.getItem('subDbKey'),
                  })
                  .then(res => {
                    if (res.data.subDbKey) {
                      localStorage.setItem('subDbKey', res.data.subDbKey);
                    }

                    runInAction(() => {
                      this.status = 'OK';
                    });
                  })
                  .catch(error => {
                    console.error(error);
                  });
              }
            });
          })
          .catch(err => {
            runInAction(() => {
              this.status = 'service worker registration failed';
            });
          });
      }
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.checkSubscription();
  }

  render() {
    return (
      <div className="notifications">
        <p>notification status: {this.status}</p>
      </div>
    );
  }
}
