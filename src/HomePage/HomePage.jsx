import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchAccountList } from '../_actions/account.actions';
import ReactTable from 'react-table';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            token: '',
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

    accountDetail(account) {
        console.log(account);
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
                <h1>Xin chào {this.state.user.name}!</h1>
                {!this.accountList &&<div>
                    Đang lấy dữ liệu, vui lòng chờ
                </div>}
                {this.accountList &&
                    <div>
                        <h3>Tài khoản của bạn:</h3>
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

export default connect(mapStateToProps, bindAction)(HomePage);