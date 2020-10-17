import React, { Component } from "react";


class SomePage extends Component {
    
    componentDidMount() {
        console.log("this.props.text  ", this.props.text);
      }
    
    render() {
        
        return (
          <div>
            {this.props.text}
          </div>
        );
      }
    }
   
    export default SomePage;
    