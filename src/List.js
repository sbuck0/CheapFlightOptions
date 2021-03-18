import './List.css';
import React from 'react';

// This class displays all the flight options given the input desired by the user and also sorts the data to the user's desire,
// whether by date, price (high to low and vice versa), and airline.

class List extends React.Component {

    constructor(props) {
      super(props);
      this.count = 0 // Useful for submitting input form multiple times
      this.state = {loading: false, data: null, number: 0, dropdown: "default", displayList: null, counter: 0, error: false}; 
      // Binding functions in order to access or change the states for this class
      this.componentDidUpdate = this.componentDidUpdate.bind(this); 
      this.run = this.run.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.onClickHandler = this.onClickHandler.bind(this);
      this.handleSelect = this.handleSelect.bind(this);
    }

    // Function that retrieves data from the API given inputs by the user and stores it in this.state elements.
    run(){
        var result = this.props.value; // Input values from user
        if(result != null){

          // Getting everything necessary for request API call
          const request = require('request');
          const options = {
            method: 'GET',
            url: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/" + result["country"] + "/" + result["currency"] + "/" + result["locale"] +
            "/" + result["origin"] + "/" + result["destination"] + "/" + result["outbound"],
            qs: {inboundpartialdate: result["inbound"]},
            json: true,
            headers: {
              'x-rapidapi-key': 'eee60225dfmsh483cdc041112e38p1614f2jsn1e3e3516465d',
              'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
              useQueryString: true
            }
          };
          // Request call that stores necessary information in this.state elements
          request(options, function (error, response, body) {
              // Handles case when input data is invalid
              if (response["statusCode"] !== 200) {
                alert("Invalid information. Please try again.");
                this.setState({error: true});
              } else {
                // Indicates that no error happened, we have loaded the data, and stores the amount of flights we have retrieved
                this.setState({error: false});
                this.setState({loading: true});
                this.setState({number: body["Quotes"].length});
                var values = [];
                var display = [];
                var carriers = {};
                // Stores all the Airlines from given input data for storing data
                for(var a = 0; a < body["Carriers"].length; a++){
                  carriers[parseInt(body["Carriers"][a]["CarrierId"])] = String(body["Carriers"][a]["Name"]);
                }
                // Stores all the flight options that will be displayed (displayList) as well as data that will be useful when sorting the list by date, price, etc. (data) 
                for(var i = 0; i < body["Quotes"].length; i++){
                  var airline = String(carriers[body["Quotes"][i]["OutboundLeg"]["CarrierIds"][0]]);
                  var price = body["Quotes"][i]["MinPrice"];
                  var departure = body["Quotes"][i]["OutboundLeg"]["DepartureDate"];
                  var date = departure.replace("T", " @");
                  var dateCompare = departure.replace(/[^0-9]/g, '');
                  values.push({"Airline": airline, "Price": parseInt(price), "Date": parseInt(dateCompare)});
                  display.push("Price: $" + String(price) + ", Airline: " + airline + ", Date and Time: " + date + (i === 0 ? " (Cheapest)" : ""));
                }
                this.setState({data: values});
                this.setState({displayList: display})
              }
              
          }.bind(this));
        }
        
    }

    // This runs the first time just to ensure that we have mounted the list component initially
    componentDidMount(){
      this.count += 1;
      this.run();
    }

    // updates the list component if user inputs different values
    componentDidUpdate(){
      if (this.count < this.props.counter){
        this.counter += 1;
        this.componentDidMount();
      }
    }

    // changes the value that the user wants the list (flight options) to be sorted by
    onClickHandler(event){
      this.setState({dropdown: event.target.value})
    }
    
    // sorts the flight options and the data that helps with sorting to the user's desire (price (low to high), price (high to low), date, and airline)
    handleSelect(event){
      event.preventDefault();
      if (this.state.data.length > 1){
        // Implemented a bubble sort algorithm to sort the data
        for (var i = 0; i < this.state.data.length; i++){
          for (var j = 0; j < this.state.data.length - i - 1; j++){
            // swaps only if the elements are out of order of the desired order
            if ((this.state.dropdown === "Price (High to Low)" && this.state.data[j]["Price"] < this.state.data[j + 1]["Price"]) ||
            (this.state.dropdown === "Price (Low to High)" && this.state.data[j]["Price"] > this.state.data[j + 1]["Price"]) ||
            (this.state.dropdown === "Airline (A-Z)" && this.state.data[j]["Airline"].toUpperCase() > this.state.data[j + 1]["Airline"].toUpperCase()) || 
            (this.state.dropdown === "Date" && this.state.data[j]["Date"] > this.state.data[j + 1]["Date"])){
              var temp = this.state.data[j]
              var temp2 = this.state.displayList[j]
              this.state.data[j] = this.state.data[j + 1];
              this.state.data[j + 1] = temp; 
              this.state.displayList[j] = this.state.displayList[j + 1];
              this.state.displayList[j + 1] = temp2; 
            }
          }
        }
        this.forceUpdate();
      }
    }

    // Renders the List component (Note that the React.Fragment component is the list component with all the flight options)
    render() {
      return (
        // handles edge cases (for example, if error loading or data has not loaded yet)
        <div id="list">{(!this.state.loading && this.state.error === false) ? <header class="semiheader">Loading...</header> : 
          ((this.state.number <= 0 || this.state.error === true) ? <header className="semiheader"> No Flights available</header>:
            // Sidebar with dropdown menu to sort elements by user's desire
            <div>
              <div id="sidebar"> 
                <header className="semiheader">Sort Flights By</header>
                <form onSubmit={this.handleSelect}>
                  <div className="form-group">
                    <select value={this.state.dropdown} onChange={this.onClickHandler} className="form-control" id="paymentMethod">
                      <option value="Price (Low to High)">Price (Low to High)</option>
                      <option value="Price (High to Low)">Price (High to Low)</option>
                      <option value="Airline (A-Z)">Airline (A-Z)</option>
                      <option value="Date">Date</option>
                    </select>
                  </div>
                  <button type="submit" id="reload" className="btn btn-primary" disabled={this.state.selectedValue === "Default"}>Reload</button>
                </form>
              </div>
              <React.Fragment id="list1">
                <header className="flights">Available Flights from {this.props.value.origin} to {this.props.value.destination}</header>
                <ul className="list-group">
                  {(this.state.displayList !== null ? (this.state.displayList.map(element => (
                    <li className="elements">{element}</li>
                  ))) : <p> Error </p>)}
                </ul>
              </React.Fragment>
            </div>
          )}
        </div>
      );
    }
}

  export default List;