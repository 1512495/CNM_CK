import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAccountList } from '../_actions/account.actions';
import {accountActions} from '../_actions';
import config from 'config';

class UpdateReminderPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            account_number: '',
            reminder_name: '',
            submitted: false,
            token: ''
        };
    }

    async componentDidMount() {
        let token = await JSON.parse(localStorage.getItem('token'));
        await this.setState({ token: token });
        let account_number = this.props.location.state.account_number;
        await this.setState({ account_number: account_number });
        let reminder_name = this.props.location.state.reminder_name;
        await this.setState({ reminder_name: reminder_name });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const {account_number, reminder_name, token } = this.state;
        const { dispatch } = this.props;
        if (reminder_name) {
            dispatch(accountActions.updateReminder(account_number, reminder_name, token));
        }
    }

    goToDelete() {
        const {account_number, reminder_name, token } = this.state;
        const { dispatch } = this.props;
        if (reminder_name) {
            dispatch(accountActions.deleteReminder(account_number, reminder_name, token));
        }
    }

    render() {
        const { signingIn } = this.props;
        const {account_number,  reminder_name, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Cập nhật tên gợi nhớ cho tài khoản</h2> <br/>
                <form name="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className='form-group'>
                        <label htmlFor="account_number">Số tài khoản</label>
                        <input disabled type="text" className="form-control" name="account_number" value={account_number} />
                    </div>
                    <div className={'form-group' + (submitted && !reminder_name ? ' has-error' : '')}>
                        <label htmlFor="reminder_name">Tên gợi nhớ</label>
                        <input type="text" className="form-control" name="reminder_name" value={reminder_name} onChange={(e) => this.handleChange(e)} />
                        {submitted && !reminder_name &&
                            <div className="help-block">Tên gợi nhớ không được để trống</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Cập nhật</button>
                        {signingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        
                    </div>
                   <br/><button className="btn btn-default" onClick={() => this.goToDelete()}>Xóa</button>
                </form>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { signingIn } = state.authentication;
    return {
        signingIn,
    };
}

export default connect(mapStateToProps)(UpdateReminderPage);