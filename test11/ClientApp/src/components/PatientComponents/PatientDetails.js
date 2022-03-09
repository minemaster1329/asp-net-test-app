import {Component} from "react";
import qs from "qs"

export default class PatientDetails extends Component {
    constructor(props){
        super(props);
        this.state = {patient: null, loading: true};
    }
    
    render(){
        let id = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).id;
        return(
            <div>
                <h1>Patient's details:</h1>
                <p>{id}</p>
            </div>
        )

        //<p>{this.props.location.query.id}</p>
    }
}