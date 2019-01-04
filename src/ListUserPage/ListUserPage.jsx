import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUserList } from '../_actions/user.actions';
import ReactTable from 'react-table';

class ListUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            token: '',
        };
    }

    async componentDidMount() {
        let token = await JSON.parse(localStorage.getItem('token'));
        await this.setState({ token: token });
        setTimeout(() => {
            this.props.fetchUserList(this.state.token);
        }, 500)
    }

    componentWillReceiveProps(next) {
        this.userList = next.userList;
        console.log(this.userList);
    }

    userDetail(user) {
        console.log(user);
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
                <h1>Staff:  {this.state.user.name}!</h1>
                {!this.userList &&<div>
                    Đang lấy dữ liệu, vui lòng chờ
                </div>}
                {this.userList &&
                    <div>
                        <h3>Danh sách User:</h3>
                        <ReactTable
                            getTdProps={(state, rowInfo, column, instance) => {
                                return {
                                    onClick: (e, handleOriginal) => {
                                        console.log("info", rowInfo);

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
    console.log(state);
    debugger;
    return {
        user: state.authentication.user,
        users: state.users,
        userList: state.userList.list
    };
}

export default connect(mapStateToProps, bindAction)(ListUserPage);