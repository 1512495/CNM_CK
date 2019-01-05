import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {accountActions} from '../_actions';

class AddAccountPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            account_number: '',
            balance: '',
            submitted: false
        };
    }

    async componentDidMount() {
        let userId = this.props.location.state.userId;
        await this.setState({ userId: userId });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { userId, account_number, balance } = this.state;
        const { dispatch } = this.props;
        if (account_number && balance) {
            dispatch(accountActions.signup(userId, account_number, balance));
        }
    }

    render() {
        const { signingIn } = this.props;
        const { account_number, balance, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Sign up</h2>
                <form name="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className={'form-group' + (submitted && !account_number ? ' has-error' : '')}>
                        <label htmlFor="account_number">Account Number</label>
                        <input type="text" className="form-control" name="account_number" value={account_number} onChange={(e) => this.handleChange(e)} />
                        {submitted && !account_number &&
                            <div className="help-block">Account Number is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !balance ? ' has-error' : '')}>
                        <label htmlFor="balance">Balance</label>
                        <input type="text" className="form-control" name="balance" value={balance} onChange={(e) => this.handleChange(e)} />
                        {submitted && !balance &&
                            <div className="help-block">Balance is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Add</button>
                        {signingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { signingIn } = state.authentication;
    return {
        signingIn
    };
}

export default connect(mapStateToProps)(AddAccountPage);