import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import config from 'config';
import { fetchAccountList } from '../_actions/account.actions';
import ReactTable from 'react-table';

class TransferPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            token: '',
            account_number: '',
            name: '',
            email: '',
            phone: '',
            submitted: false
        };
    }

    async componentDidMount() {
        let token = await JSON.parse(localStorage.getItem('token'));
        console.log(token);
        await this.setState({ token: token });
        setTimeout(() => {
            this.props.fetchAccountList(this.state.user.id, this.state.token);
        }, 500)

    }

    componentWillReceiveProps(next) {
        this.accountList = next.accountList;
        console.log(this.accountList);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { account_number, email, phone } = this.state;
        const { dispatch } = this.props;
        if (username && email && phone) {
            dispatch(userActions.signup(username, password, email, phone));
        }
    }

    fetchAccount(e) {
        e.preventDefault();
        fetch(`${config.apiUrl}/account_number/` + this.state.account_number, {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + this.token
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
        const { account_number, name, email, phone, submitted } = this.state;
        return (

            <div className="col-md-6 col-md-offset-3">
                <h2>Chuyển tiền</h2>
                <form name="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="account_number">Số tài khoản nhận tiền</label>
                        <input type="text" className="form-control" name="account_number" value={account_number} onChange={(e) => this.handleChange(e)} />
                        {submitted && !account_number &&
                            <div className="help-block">Account number is required</div>
                        }
                        <button className="btn btn-primary" onClick={(e) => this.fetchAccount(e)}>
                            Truy vấn thông tin
                        </button>
                    </div>
                    <div className='form-group' >
                        <label htmlFor="name">Tên người thụ hưởng</label>
                        <input disabled type="text" className="form-control" name="name" value={name} />
                    </div>
                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" value={email} onChange={(e) => this.handleChange(e)} />
                        {submitted && !email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !phone ? ' has-error' : '')}>
                        <label htmlFor="phone">Phone</label>
                        <input type="text" className="form-control" name="phone" value={phone} onChange={(e) => this.handleChange(e)} />
                        {submitted && !phone &&
                            <div className="help-block">Phone is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Chuyển tiền</button>
                        {signingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
            </div>
        );
    }
}

function bindAction(dispatch) {
    return {
        fetchAccountList: (id, token) => dispatch(fetchAccountList(id, token)),
    }
}

function mapStateToProps(state) {
    return {
        user: state.authentication.user,
        users: state.users,
        accountList: state.accountList.list
    };
}

export default connect(mapStateToProps, bindAction)(TransferPage);