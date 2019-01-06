import React from 'react';
import { connect } from 'react-redux';

import { fetchHistoryList } from '../_actions/history.actions';
import ReactTable from 'react-table';

class HistoryPage extends React.Component {
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
            this.props.fetchHistoryList(this.state.user.id, this.state.token);
        }, 500)

    }

    componentWillReceiveProps(next) {
        this.historyList = next.historyList;
        console.log(this.historyList);
    }

    accountDetail(account) {
        console.log(account);
    }

    render() {
        const columns = [{
            Header: 'Tài khoản nguồn',
            accessor: 'from_account' // String-based value accessors!
        }, {
            Header: 'Tài khoản đích',
            accessor: 'to_account',
        },
        {
            Header: 'Số tiền',
            accessor: 'amount',
        }]
        return (
            <div >
                <h1>Xin chào {this.state.user.name}!</h1>
                {!this.historyList && <div>
                    Đang lấy dữ liệu, vui lòng chờ
                </div>}
                {this.historyList &&
                    <div>
                        <h3>Lịch sử giao dịch của bạn: </h3>
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
                            data={this.historyList}
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
        fetchHistoryList: (id, token) => dispatch(fetchHistoryList(id, token)),
    }
}

function mapStateToProps(state) {
    return {
        user: state.authentication.user,
        users: state.users,
        historyList: state.historyList.list
    };
}

export default connect(mapStateToProps, bindAction)(HistoryPage);