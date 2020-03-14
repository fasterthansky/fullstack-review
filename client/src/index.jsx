import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

   search (term) {
    $.ajax({
      url: '/repos',
      method: 'POST',
      data: JSON.stringify({username: term}),
      contentType: "application/json",
      success: (data) => {setTimeout(this.getTop25.bind(this), 1000)}/*this.componentDidMount()*/,
      error: () => console.log('POST error!')
      })
  }

  getTop25 () {
    $.ajax({
      url: '/repos',
      method: 'GET',
      success: (data) => {this.setState({repos: data})},
      error: () => console.log('error!')
      })
  }

  componentDidMount() {
    this.getTop25();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));