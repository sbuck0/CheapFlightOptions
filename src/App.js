import './App.css';
import mainlogo from './Logo.png';
import Input from './Input';
import List from './List';
import React from 'react';

// This holds the header, the input component and the list component. Essentially, this App component is the entire application
// and is the only component rendered by the index.js file
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {submitted: false, results: null, updates: 0};
    // Binding functions in order to access or change the states for this class.
    this.changeSubmitState = this.changeSubmitState.bind(this)
    this.handleResults = this.handleResults.bind(this)
  }

  //Sent to the Input component that changes the submit status of the input component.
  changeSubmitState() {
    this.setState({submitted: true});
    // this.state.updates ensures that we have the ability to reload List component when the input data changes.
    var counter = this.state.updates;
    counter += 1;
    this.setState({updates: counter})
  }

  // Holds the input data for the user to be sent to the list component for analyzing
  handleResults(data){
    this.setState({results: data});
  }

  // Renders the Input component and the List component (if submit button in input component was clicked).
  render(){
    return (
      <div id="everything">
        <header id="heading"><img src={mainlogo} id="logo" alt='Logo Not Loading'/>HIGHFLYING</header>
        <Input submitState={this.changeSubmitState} returnResults={this.handleResults}/>
        {this.state.submitted ? <List value={this.state.results} counter={this.state.updates}/> : <p></p>}

      </div>
    );
  }
}

export default App;
