import React from 'react';
import ListItem from './ListItem.jsx';
import ListForm from './ListForm.jsx';

class ListItems extends React.Component {
    componentDidMount() {
        this.getPromise();
    }

    refreshState() {
        this.getPromise();
    }

    getPromise() {
        let component = this;
        function getPromise(){
            const URL = '/mongo';

            if(window.Promise){
                return new Promise(function(resolve, reject){
                    var req = new XMLHttpRequest();

                    req.open('GET', URL);

                    req.onload = function(){
                        if(req.status === 200){
                            resolve(req.response);
                        } else {
                            reject(Error(request.statusText));
                        }
                    }

                    req.onprogress = function(){
                        console.log('loading...');
                    }

                    req.onerror = function(){
                        reject(Error('Error fetching data.'));
                    }

                    req.setRequestHeader('Accept', 'application/json');

                    req.send();
                    console.log('Asynchronous request made');
                });
            } else {
                console.log('promise not available');
            }
        }

        var promise = getPromise();
        promise.then(function(data){
            console.log('Got data! Promise fulfilled');
            component.setState({data: JSON.parse(data)});
        }, function(err){
            console.log('Promise rejected.');
            console.log(err.message);
        });
    }

    render() {
        if (this.state) {
            return (
                <div>
                    <ListForm refreshClick={this.refreshState.bind(this)} />
                    <ul>
                        {this.state.data.map((item, index) => <ListItem key={index} properties={item} />)}
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

ListItems.propTypes = {
    //empty
}

export default ListItems;