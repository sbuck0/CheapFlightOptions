import './Input.css';
import React from 'react';
import {FormControl, FormGroup, FormLabel, Button} from 'react-bootstrap';

// This class is a component in the application that helps the user input the information that gives them the desired flight options.
class Input extends React.Component {

    constructor(props) {
      super(props);
      this.state = {country: 'US', currency: '', locale: 'US-en', origin: '', destination: '', outbound: '', inbound: ''};
      // Binding functions in order to access or change the states for this class.
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Changes the data to be sent to the user if the user changes the inputs.
    handleChange(event) {
      let name = event.target.name;
      let value = event.target.value;
      this.setState({[name]: value});
    }

    // Sends the data to the List component that will output the desired list in an API call.
    handleSubmit(event) {
      this.props.submitState();
      this.props.returnResults(this.state)
      event.preventDefault();
      this.setState({country: "US"})
      this.setState({locale: "US-en"})
    }

    // Renders the Input Component (Mainly consists of a form with inputs)
    render() {
      return (
        <div id="inputcomponent">
          <header id="headersub">Find a Flight!</header>
          <form id="theform" onSubmit={this.handleSubmit}>
            <FormGroup controlId="formControlsText" className="inputelement">
              <FormLabel>Origin</FormLabel>
              <FormControl type="text" placeholder="(ex. JFK-sky)"  name='origin' value={this.state.origin} onChange={this.handleChange}/>
            </FormGroup> 
            <FormGroup controlId="formControlsText" className="inputelement">
              <FormLabel>Destination</FormLabel>
              <FormControl type="text" placeholder="(ex. JFK-sky)"  name='destination' value={this.state.destination} onChange={this.handleChange}/>
            </FormGroup> 
            <FormGroup controlId="formControlsText" className="inputelement">
              <FormLabel>Outbound</FormLabel>
              <FormControl type="text" placeholder="(yyyy-mm-dd) or anytime"  name='outbound' value={this.state.outbound} onChange={this.handleChange}/>
            </FormGroup> 
            <FormGroup controlId="formControlsText" className="inputelement">
              <FormLabel>Inbound</FormLabel>
              <FormControl type="text" placeholder="(yyyy-mm-dd) or anytime" name='inbound' value={this.state.inbound} onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup controlId="formControlsText" className="inputelement">
              <FormLabel>Currency</FormLabel>
              <FormControl type="text" placeholder="(ex. USD)"  name='currency' value={this.state.currency} onChange={this.handleChange}/>
            </FormGroup> 
            <FormGroup controlId="formControlsText" className="inputelement">
              <FormLabel>Country</FormLabel>
              <FormControl type="text" placeholder="(ex. US) (optional)"  name='country' value={this.state.country} onChange={this.handleChange}/>
            </FormGroup> 
            <FormGroup controlId="formControlsText" className="inputelement">
              <FormLabel>Locale</FormLabel>
              <FormControl type="text" placeholder="(ex. en-US) (optional)"  name='locale' value={this.state.locale} onChange={this.handleChange}/>
            </FormGroup>  
            <Button variant="primary" type="submit" value="Options" id="submitbutton">
              Submit
            </Button>
          </form>
        </div>
      );
    }
  }


export default Input;