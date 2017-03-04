import React from 'react';
import ListItem from './ListItem.jsx';
import ListForm from './ListForm.jsx';

class ListItems extends React.Component {
    componentDidMount() {
        this.getEntries();
    }

    refreshState = () => {
        this.getEntries();
    }

    getEntries = () => {
        let component = this;
        function getEntries(){
            const URL = '/mongo';

            if(window.Promise){
                return new Promise(function(resolve, reject){
                    var req = new XMLHttpRequest();

                    req.open('GET', URL);

                    req.onload = () => {
                        if(req.status === 200){
                            resolve(req.response);
                        } else {
                            reject(Error(request.statusText));
                        }
                    }

                    req.onprogress = () => {
                        console.log('loading...');
                    }

                    req.onerror = () => {
                        reject(Error('Error fetching data.'));
                    }

                    req.setRequestHeader('Accept', 'application/json');

                    req.send();
                    console.log('Asynchronous request made');
                });
            } else {
                console.error('promise not available');
            }
        }

        var promise = getEntries();
        promise.then((data) => {
            console.log('Got data! Promise fulfilled');
            component.setState({data: JSON.parse(data)});
        }, (err) => {
            console.error('Promise rejected.');
            console.error(err.message);
        });
    }

    render() {
        if (this.state) {
            return (
                <div>
                    <ListForm refreshClick={this.refreshState.bind(this)} />
                    <ul>
                        {this.state.data.map((item, index) => <ListItem key={index} itemFields={item} />)}
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="loader"></div>
            )
        }
    }
}

export default ListItems;