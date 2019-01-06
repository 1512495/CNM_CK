import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import config from 'config';
import { fetchAccountList } from '../_actions/account.actions';
import { fetchReminderList } from '../_actions/reminder.actions';
import ReactTable from 'react-table';

class TransferPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: '',
            user: this.props.user,
            token: '',
            account_number: '',
            name: '',
            submitted: false,
            balance: 0,
            value: '',
            amount: 0,
            content: '',
            to_account_balance: '',
            fee_from_user: false,
            OTP: '',
            isOTPShow: false,
            isDisabled: false,
        };
        this.accountList = [];
        this.reminderList = [];
    }

    async componentDidMount() {
        let token = await JSON.parse(localStorage.getItem('token'));
        console.log(token);
        await this.setState({ token: token });
        setTimeout(() => {
            this.props.fetchAccountList(this.state.user.id, this.state.token);
            this.props.fetchReminderList(this.state.user.id, this.state.token);
        }, 500)

    }


    // optionsList = [];
    componentWillReceiveProps(next) {
        this.accountList = next.accountList;
        this.reminderList = next.reminderList;

        // for (let i = 0; i < this.accountList.length; i++) {
        //     this.optionsList.push(<option value={this.accountList[i].balance} >{this.accountList[i].account_number}</option>);
        // }
        console.log(this.reminderList);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        if (this.state.OTP) {
            this.setState({ isDisabled: false });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        if (!this.state.account_number || !this.state.amount || !this.state.value || !this.state.source) {
            alert("Vui lòng nhập đầy đủ thông tin!!");
        } else {
            if (this.state.isOTPShow == true) {
                fetch(`${config.apiUrl}/confirm/` + this.state.OTP, {
                    method: 'POST',
                    headers: {
                        'Authorization': this.state.token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }).then((response) => {
                    if (response.status == 200) {
                        response.json().then(resJSON => {
                            if (resJSON.status == "ok") {
                                this.transfer();
                            } else {
                                alert("Mã OTP của bạn sai hoặc quá hạn, vui lòng thử lại!")
                            }
                        })
                    }
                    else { return; }
                }).catch(error => console.log(error));
            }
            else {
                this.showOTP();
            }
        }
        // this.transfer();
    }

    showOTP() {
        let data = {
            name: this.state.user.name,
            email: this.state.user.email,
            from_account: this.state.source,
            to_account: this.state.account_number,
            amount: this.state.amount,
            content: this.state.content,
            fee_from_user: this.state.fee_from_user
        };
        this.setState({ isDisabled: true, isOTPShow: true });
        fetch(`${config.apiUrl}/otp/`, {
            method: 'POST',
            headers: {
                'Authorization': this.state.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status == 200) {
                response.json().then(resJSON => {
                    alert('Đã gửi email xác nhận!')
                })
            }
            else { return; }
        }).catch(error => console.log(error));
    }

    transfer() {
        let data = {
            from_account: this.state.source,
            to_account: this.state.account_number,
            amount: this.state.amount,
            content: this.state.content,
            fee_from_user: this.state.fee_from_user
        };
        fetch(`${config.apiUrl}/transaction/`, {
            method: 'POST',
            headers: {
                'Authorization': this.state.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status == 200) {
                response.json().then(resJSON => {
                    console.log(resJSON);
                    alert("Chuyển tiền thành công!");
                    location.reload();
                })
            }
            else { return; }
        }).catch(error => console.log(error));

        let dataSource = {
            balance: (parseFloat(this.state.value) - parseFloat(this.state.amount)).toString()
        };
        let dataTo = {
            balance: (parseFloat(this.state.to_account_balance) + parseFloat(this.state.amount)).toString()
        };

        fetch(`${config.apiUrl}/account/` + this.state.source, {
            method: 'PUT',
            headers: {
                'Authorization': this.state.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataSource)
        }).then((response) => {
            if (response.status == 200) {
                response.json().then(resJSON => {
                    console.log(resJSON);
                })
            }
            else { return; }
        }).catch(error => console.log(error));
        fetch(`${config.apiUrl}/account/` + this.state.account_number, {
            method: 'PUT',
            headers: {
                'Authorization': this.state.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataTo)
        }).then((response) => {
            if (response.status == 200) {
                response.json().then(resJSON => {
                    console.log(resJSON);
                })
            }
            else { return; }
        }).catch(error => console.log(error));
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
                        this.setState({ to_account_balance: resJSON[0].balance });
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
        const { account_number, name, submitted, amount, content, value, fee_from_user, OTP } = this.state;

        return (

            <div className="col-md-6 col-md-offset-3">
                <div style={{ textAlign: 'center', margin: '10px' }}>
                    <h2>Chuyển tiền</h2>
                </div>
                <form name="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="source">Tài khoản nguồn:</label>
                        <select className="form-control" value={this.state.value} onChange={(event) => { this.setState({ value: event.target.value, source: event.target.selectedOptions[0].innerHTML.trim() }); }}>
                            <option value='' ></option>
                            {this.accountList.map(function (object, i) {
                                return <option key={i} value={object.balance} > {object.account_number}</option>
                            })}
                        </select>
                    </div>
                    <div className='form-group' >
                        <label htmlFor="name">Số dư</label>
                        <input disabled type="text" className="form-control" name="name" value={this.state.value} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="source">Tài khoản thụ hưởng đã lưu:</label>
                        <select className="form-control" value={this.state.account_number} onChange={(event) => { this.setState({ account_number: event.target.value }, () => { this.fetchAccount() }); }}>
                            <option value='' ></option>
                            {this.reminderList.map(function (object, i) {
                                return <option key={i} value={object.account_number} > {object.reminder_name}</option>
                            })}
                        </select>
                    </div>
                    <div className={'form-group' + (submitted && !account_number ? ' has-error' : '')}>
                        <label htmlFor="account_number">Số tài khoản nhận tiền</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '8fr 1fr' }}>
                            <input style={{ width: '95%' }} type="text" className="form-control" name="account_number" value={account_number} onChange={(e) => this.handleChange(e)} />
                            <button className="btn btn-default" title="Xem thông tin tài khoản" onClick={(e) => this.fetchAccount(e)}><i className="glyphicon glyphicon-info-sign" /></button>
                        </div>
                        {submitted && !account_number &&
                            <div className="help-block">Số tài khoản không được để trống</div>
                        }
                    </div>
                    <div className='form-group' >
                        <label htmlFor="name">Tên người thụ hưởng</label>
                        <input disabled type="text" className="form-control" name="name" value={name} />
                    </div>
                    <div className={'form-group' + (submitted && !amount || (parseFloat(amount) > parseFloat(value)) ? ' has-error' : '')}>
                        <label htmlFor="amount">Số tiền chuyển</label>
                        <input type="number" className="form-control" name="amount" value={amount} onChange={(e) => this.handleChange(e)} />
                        {submitted && !amount || (parseFloat(amount) > parseFloat(value)) &&
                            <div className="help-block">Nhập số tiền chuyển hợp lệ</div>
                        }
                    </div>
                    <div className='form-group'>
                        <label htmlFor="content">Nội dung chuyển tiền</label>
                        <textarea className="form-control" name="content" value={content} onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" name="fee" value={fee_from_user} onChange={() => { this.setState({ fee_from_user: !fee_from_user }) }} />
                        <label htmlFor="fee">&nbsp;&nbsp;Người chuyển chịu phí</label>
                    </div>
                    {this.state.isOTPShow &&
                        <div className='form-group' >
                            <label htmlFor="OTP">Mã OTP từ mail</label>
                            <input type="text" className="form-control" name="OTP" value={OTP} onChange={(e) => this.handleChange(e)} />
                        </div>}
                    <div className="form-group" style={{ margin: '25px 0px' }}>
                        <button className="btn btn-primary" style={{ width: '100%' }} disabled={this.state.isDisabled}>Chuyển tiền</button>
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
        fetchReminderList: (id, token) => dispatch(fetchReminderList(id, token)),

    }
}

function mapStateToProps(state) {
    return {
        user: state.authentication.user,
        users: state.users,
        accountList: state.accountList.list,
        reminderList: state.reminderList.list,
    };
}

export default connect(mapStateToProps, bindAction)(TransferPage);