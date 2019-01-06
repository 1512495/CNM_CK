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
            submitted: false,
            token: '',
        };
    }

    async componentDidMount() {
        let token = await JSON.parse(localStorage.getItem('token'));
        await this.setState({ token: token });
        let userId = this.props.location.state.userId;
        await this.setState({ userId: userId });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleChangeNumber(e) {
        const account_number = (e.target.validity.valid) ? e.target.value : this.state.account_number;
        this.setState({ 
            account_number: account_number
         });
    }

    handleChangeBalance(e) {
        const balance = (e.target.validity.valid) ? e.target.value : this.state.balance;
        this.setState({ 
            balance: balance
         });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { userId, account_number, balance, token } = this.state;
        const { dispatch } = this.props;
        if (account_number.length >= 10 && balance) {
            dispatch(accountActions.signup(userId, account_number, balance, token));
        }
    }

    render() {
        const { signingIn } = this.props;
        const { account_number, balance, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Tài khoản mới</h2><br/>
                <form name="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className={'form-group' + (((submitted && !account_number) || (submitted && account_number.length < 10)) ? ' has-error' : '')}>
                        <label htmlFor="account_number">Số tài khoản</label>
                        <input type="text" pattern="[0-9]*" className="form-control" name="account_number" value={account_number} onChange={(e) => this.handleChangeNumber(e)} />
                        {submitted && !account_number &&
                            <div className="help-block">Số tài khoản không được để trống</div>
                        }
                        {submitted && account_number.length < 10 &&
                            <div className="help-block">Số tài khoản ít nhất 10 ký tự</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !balance ? ' has-error' : '')}>
                        <label htmlFor="balance">Số dư</label>
                        <input type="text" pattern="[0-9]*" className="form-control" name="balance" value={balance} onChange={(e) => this.handleChangeBalance(e)} />
                        {submitted && !balance &&
                            <div className="help-block">Số dư không được để trống</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Thêm</button>
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