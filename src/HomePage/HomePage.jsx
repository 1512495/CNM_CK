import React from 'react';
import { connect } from 'react-redux';
import config from 'config';
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
    deleteAccount(account) {
        if (this.accountList.length <= 1) {
            alert("Vui lòng duy trì ít nhất một tài khoản");
        }
        else if (account.original.balance != 0) {
            alert('Vui lòng chuyển tiền để số dư bằng 0');
        }
        else {
            fetch(`${config.apiUrl}/account/` + account.original.account_number, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'JWT ' + this.state.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((response) => {
                if (response.status == 200) {
                    response.json().then(resJSON => {
                        this.props.fetchAccountList(this.state.user.id, this.state.token);
                        alert('Đã xóa tài khoản thành công, vui lòng liên hệ nhân viên để biết thêm chi tiết');
                        console.log(resJSON);
                    })
                }
                else { return; }
            }).catch(error => console.log(error));
        }
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
                {!this.accountList && <div>
                    Đang lấy dữ liệu, vui lòng chờ
                </div>}
                {this.accountList &&
                    <div>
                        <h3>Tài khoản của bạn: (Nhấn vào để đóng tài khoản)</h3>
                        <ReactTable
                            getTdProps={(state, rowInfo, column, instance) => {
                                return {
                                    onClick: (e, handleOriginal) => {
                                        if (window.confirm('Bạn có muốn xóa tài khoản này không?'))
                                            this.deleteAccount(rowInfo)
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