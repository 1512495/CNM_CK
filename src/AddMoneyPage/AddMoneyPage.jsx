import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {accountActions} from '../_actions';

class AddMoneyPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            add_money: '',
            account_number: '',
            balance: '',
            submitted: false
        };
    }

    async componentDidMount() {
        let account_number = this.props.location.state.account_number;
        let balance = this.props.location.state.balance;
        let userId = this.props.location.state.userId;
        await this.setState({ 
            account_number: account_number,
            balance: balance,
            userId: userId
        });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleChangeNumber(e) {
        const add_money = (e.target.validity.valid) ? e.target.value : this.state.add_money;
        this.setState({ 
            add_money: add_money
         });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { userId, account_number, balance, add_money } = this.state;
        const { dispatch } = this.props;
        if (add_money) {
            dispatch(accountActions.addMoney(userId, account_number, balance, add_money));
        }
    }

    render() {
        const { signingIn } = this.props;
        const { account_number, balance, add_money, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Add Money To Account</h2> <br/>
                <form name="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className='form-group'>
                        <label htmlFor="account_number">Account Number</label>
                        <input readOnly type="text" className="form-control" name="account_number" value={account_number} onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="balance">Balance</label>
                        <input readOnly type="text" className="form-control" name="balance" value={balance} onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="add_money">Adding Money</label>
                        <input type="text" pattern="[0-9]*" className="form-control" name="add_money" value={add_money} onChange={(e) => this.handleChangeNumber(e)} />
                        {submitted && !add_money &&
                            <div className="help-block">Adding Money is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Update Account</button>
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

export default connect(mapStateToProps)(AddMoneyPage);