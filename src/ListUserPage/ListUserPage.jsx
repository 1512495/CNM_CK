import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUserList } from '../_actions/user.actions';
import ReactTable from 'react-table';

class ListUserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            staff: this.props.staff,
            token: '',
        };
        if (this.state.staff == {}) {
            this.props.history.push({ pathname: '/login' });
        }
    }

    async componentDidMount() {
        let token = await JSON.parse(localStorage.getItem('token'));
        await this.setState({ token: token });
        setTimeout(() => {
            this.props.fetchUserList(token);
        }, 500)
    }

    componentWillReceiveProps(next) {
        this.userList = next.userList;
    }

    userDetail(user) {
        console.log(user.original.id);
        this.props.history.push({
            pathname: '/listAccount',
            state: { userId: user.original.id }
          });
    }

    goToAddUser() {
        this.props.history.push({ pathname: '/adduser' });
    }

    render() {
        const columns = [{
            Header: 'ID',
            accessor: 'id' // String-based value accessors!
        }, {
            Header: 'Name',
            accessor: 'name',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Phone',
            accessor: 'phone',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Email',
            accessor: 'email',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }]
        return (
            <div >
                <h1>Staff:  {this.state.staff.name}!</h1>
                {!this.userList && <div>
                    Đang lấy dữ liệu, vui lòng chờ
                </div>}
                {this.userList &&
                    <div>
                        <h3>Danh sách User:</h3>
                        <button className="btn btn-success" onClick={() => this.goToAddUser()}>Add User</button>
                        <ReactTable
                            getTdProps={(state, rowInfo, column, instance) => {
                                return {
                                    onClick: (e, handleOriginal) => {
                                        if (handleOriginal) {
                                            this.userDetail(rowInfo);
                                        }
                                    }
                                };
                            }}
                            data={this.userList}
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
        fetchUserList: (token) => dispatch(fetchUserList(token))
    }
}

function mapStateToProps(state) {
    return {
        staff: state.authentication.staff,
        users: state.users,
        userList: state.userList.list
    };
}

export default connect(mapStateToProps, bindAction)(ListUserPage);