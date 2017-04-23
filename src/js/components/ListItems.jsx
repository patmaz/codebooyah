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

        let promise = getEntries();
        promise.then((data) => {
            console.log('Got data! Promise fulfilled');
            this.setState({
                data: JSON.parse(data),
                dataDisplay: JSON.parse(data)
            });
        }, (err) => {
            console.error('Promise rejected.');
            console.error(err.message);
        });
    }

    sortDataAsc = (prop) => {
        let sorted = this.state.dataDisplay.sort((a, b) => {
            let propA = a[prop].toUpperCase();
            let propB = b[prop].toUpperCase();
            if (propA < propB) {
                return -1;
            }
            if (propA > propB) {
                return 1;
            }
            return 0;
        });
        this.setState({data: sorted});
    }

    sortDataDesc = (prop) => {
        let sorted = this.state.dataDisplay.sort((a, b) => {
            let propA = a[prop].toUpperCase();
            let propB = b[prop].toUpperCase();
            if (propA > propB) {
                return -1;
            }
            if (propA < propB) {
                return 1;
            }
            return 0;
        });
        this.setState({data: sorted});
    }

    filterData = (prop, e) => {
        let filtered = this.state.data.filter((el, index, arr) => {
            return el.title.substring(0, e.target.value.length) === e.target.value;
        });
        this.setState({dataDisplay: filtered});
    }

    render() {
        if (this.state) {
            return (
                <div>
                    <ListForm refreshClick={this.refreshState} />
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    Title
                                    <button onClick={() => this.sortDataAsc('title')}>acs</button>
                                    <button onClick={() => this.sortDataDesc('title')}>desc</button>
                                    <input placeholder={'filter'} type={'text'} onChange={(e) => this.filterData('title', e)} />
                                </td>
                                <td>
                                    Content
                                    <button onClick={() => this.sortDataAsc('body')}>asc</button>
                                    <button onClick={() => this.sortDataDesc('body')}>desc</button>
                                </td>
                                <td>
                                    Date
                                    <button onClick={() => this.sortDataAsc('date')}>asc</button>
                                    <button onClick={() => this.sortDataDesc('date')}>desc</button>
                                </td>
                                <td>
                                    ID
                                    <button onClick={() => this.sortDataAsc('_id')}>asc</button>
                                    <button onClick={() => this.sortDataDesc('_id')}>desc</button>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.dataDisplay.map((item, index) => <ListItem key={index} itemFields={item} />)}
                        </tbody>
                    </table>
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