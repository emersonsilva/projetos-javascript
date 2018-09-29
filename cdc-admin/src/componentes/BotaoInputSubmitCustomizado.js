import React, {Component} from 'react';

export default class InputSubmitCustomizado extends Component {

    render() {
        return (
            <div className="pure-control-group">
                <label></label>
                <button type="submit" className="pure-button pure-button-primary" label={this.props.label}>{this.props.label}</button>
            </div>
        );
    }
}