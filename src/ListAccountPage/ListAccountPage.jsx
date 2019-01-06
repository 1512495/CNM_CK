import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchAccountList } from '../_actions/account.actions';
import ReactTable from 'react-table';

class ListAccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            token: '',
        };
    }

    async componentDidMount() {
        let userId = this.props.location.state.userId;
        let token = await JSON.parse(localStorage.getItem('token'));
        console.log(token);
        await this.setState({ token: token, userId: userId });
        setTimeout(() => {
            this.props.fetchAccountList(this.state.userId, this.state.token);
        }, 500)

    }

    componentWillReceiveProps(next) {
        this.accountList = next.accountList;
        console.log(this.accountList);
    }

    accountDetail(account) {
        console.log(account.original.account_number);
        this.props.history.push({
            pathname: '/addMoney',
            state: { 
                account_number: account.original.account_number,
                balance: account.original.balance,
                userId: account.original.user_id
            }
        });
    }

    goToAddAccount() {
        this.props.history.push({ 
            pathname: '/addAccount',
            state: { userId: this.state.userId } 
        });
    }

    render() {
        const columns = [{
            Header: 'Số tài khoản',
            accessor: 'account_number' // String-based value accessors!
        }, {
            Header: 'Số dư hiện tại',
            accessor: 'balance',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }]
        return (
            <div >
                
                {!this.accountList &&<div>
                    Đang lấy dữ liệu, vui lòng chờ
                </div>}
                {this.accountList &&
                    <div>
                        <h3>Tài khoản của :</h3>
                        <button className="btn btn-success" onClick={() => this.goToAddAccount()}>Add Account</button>
                        <ReactTable
                            getTdProps={(state, rowInfo, column, instance) => {
                                return {
                                    onClick: (e, handleOriginal) => {
                                        console.log("info", rowInfo);

                                        if (handleOriginal) {
                                            this.accountDetail(rowInfo);
                                        }
                                    }
                                };
                            }}
                            data={this.accountList}
                            columns={columns}
                        />
                    </div>
                }
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

export default connect(mapStateToProps, bindAction)(ListAccountPage);