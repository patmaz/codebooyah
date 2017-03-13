import React from 'react';

class SearchGifSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            speechAvailable: true,
            speechRecognitionStatus: '...',
            speechInProgress: false
        };
    }

    componentDidMount() {
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
                        this.setState({speechInProgress: false});
                    }
                }
            }

            this.recognizer.onerror = (e) => {
                this.setState({speechRecognitionStatus: 'Speech recognition error'});
                this.setState({speechInProgress: false});
            }
        }
    }

    speechRecognitionStart = () => {
        this.recognizer.start();
        this.setState({speechInProgress: true});
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
                        <p>you can <button 
                                        className={this.state.speechInProgress ? 'rec' : 'norec'}
                                        onClick={this.speechRecognitionStart}>SAY</button> what you want</p>
                        <p className={'small'}>speech recognition status: {this.state.speechRecognitionStatus}</p>
                    </div>
                }
                {this.state.speechAvailable === false &&
                    <p className={'small'}>Upsss, your browser is <a target={'_blank'} href={'https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#Browser_compatibility'}>deaf</a></p>
                }
            </div>
        )
    }
}

export default SearchGifSearch;