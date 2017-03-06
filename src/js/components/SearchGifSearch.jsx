import React from 'react';

class SearchGifSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            speechAvailable: true,
            speechRecognitionStatus: '...'
        };

        this.speechRecognitionInit();
    }

    changeHandler = (e) => {
        var searchTerm = e.target.value;
        this.setState({searchTerm});
        this.props.onSearch(searchTerm);
        this.setState({speechRecognitionStatus: '...'});
    }

    keyUpHandler = (e) => {
        if (e.keyCode === 13) {
            this.props.onSearch(this.state.searchTerm);
        }
    }

    speechRecognitionInit = () => {
        window.SpeechRecognition = window.SpeechRecognition ||
                                 window.webkitSpeechRecognition ||
                                 null;
        if (window.SpeechRecognition === null) {
            this.setState({speechAvailable: false});
        } else {
            this.recognizer = new window.SpeechRecognition();

            this.recognizer.onresult = (e) => {
                for (let i = e.resultIndex; i < e.results.length; i++) {
                    if (e.results[i].isFinal) {
                        this.setState({searchTerm: e.results[i][0].transcript});
                        this.props.onSearch(this.state.searchTerm);
                        this.setState({speechRecognitionStatus: `${e.results[i][0].confidence} confidence`});
                    }
                }
            }

            this.recognizer.onerror = (e) => {
                this.setState({speechRecognitionStatus: 'Speech recognition error'});
            }
        }
    }

    render() {
        return (
            <div className="gif-search__search">
                <input  className="input__field"
                        type="text"
                        placeholder={'search for gif'}
                        onChange={this.changeHandler}
                        onKeyUp={this.keyUpHandler}
                        value={this.state.searchTerm}/>
                {this.state.speechAvailable === true &&
                    <div>
                        <p>you can <button onClick={() => this.recognizer.start()}>SAY</button> what you want</p>
                        <p className={'small'}>speech recognition status: {this.state.speechRecognitionStatus}</p>
                    </div>
                }
            </div>
        )
    }
}

export default SearchGifSearch;