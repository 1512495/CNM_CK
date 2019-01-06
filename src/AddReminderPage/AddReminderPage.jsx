import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAccountList } from '../_actions/account.actions';
import {accountActions} from '../_actions';
import config from 'config';

class AddReminderPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            name: '',
            account_number: '',
            reminder_name: '',
            submitted: false,
            token: ''
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

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const {userId, name, account_number, reminder_name, token } = this.state;
        const { dispatch } = this.props;
        if (account_number && name != 'Không có tài khoản nào') {
            dispatch(accountActions.addReminder(userId, name, account_number, reminder_name, token));
        }
    }

    fetchAccount(e = null) {
        if (e != null)
            e.preventDefault();
        fetch(`${config.apiUrl}/account_number/` + this.state.account_number, {
            method: 'GET',
            headers: {
                'Authorization': this.state.token
            },
        }).then((response) => {
            if (response.status == 200) {
                response.json().then(resJSON => {
                    if (resJSON.length > 0) {
                        this.setState({ name: resJSON[0].name });
                    }
                    else {
                        this.setState({ name: "Không có tài khoản nào" });
                    }
                })
            }
            else { return; }
        }).catch(error => console.log(error));
    }

    render() {
        const { signingIn } = this.props;
        const { name, account_number,  reminder_name, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Thêm tên gợi nhớ cho tài khoản</h2> <br/>
                <form name="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className={'form-group' + (submitted && !account_number ? ' has-error' : '')}>
                        <label htmlFor="account_number">Số tài khoản</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '8fr 1fr' }}>
                            <input style={{ width: '95%' }} type="text" className="form-control" name="account_number" value={account_number} onChange={(e) => this.handleChange(e)} />
                            <button className="btn btn-default" title="Xem thông tin tài khoản" onClick={(e) => this.fetchAccount(e)}><i className="glyphicon glyphicon-info-sign" /></button>
                        </div>
                        {submitted && !account_number &&
                            <div className="help-block">Số tài khoản không được để trống</div>
                        }
                    </div>
                    <div className='form-group' >
                        <label htmlFor="name">Tên tài khoản</label>
                        <input disabled type="text" className="form-control" name="name" value={name} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="reminder_name">Tên gợi nhớ</label>
                        <input type="text" className="form-control" name="reminder_name" value={reminder_name} onChange={(e) => this.handleChange(e)} />
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
        signingIn,
    };
}

export default connect(mapStateToProps)(AddReminderPage);