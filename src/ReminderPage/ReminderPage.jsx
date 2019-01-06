import React from 'react';
import { connect } from 'react-redux';

import { fetchReminderList } from '../_actions/reminder.actions';
import ReactTable from 'react-table';

class ReminderPage extends React.Component {
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
            this.props.fetchReminderList(this.state.user.id, this.state.token);
        }, 500)

    }

    componentWillReceiveProps(next) {
        this.reminderList = next.reminderList;
        console.log(this.reminderList);
    }

    reminderDetail(reminder) {
        this.props.history.push({ 
            pathname: '/updateReminder',
            state: { 
                account_number: reminder.original.account_number,
                reminder_name: reminder.original.reminder_name
            }
        });

    }

    goToAddReminder() {
        this.props.history.push({ 
            pathname: '/addReminder',
            state: { 
                userId: this.state.user.id
            }
        });
    }

    render() {
        const columns = [{
            Header: 'Số tài khoản',
            accessor: 'account_number' // String-based value accessors!
        }, {
            Header: 'Tên gợi nhớ',
            accessor: 'reminder_name',
        },
        ]
        return (
            <div >
                <h1>Xin chào {this.state.user.name}!</h1>
                {!this.reminderList && <div>
                    Đang lấy dữ liệu, vui lòng chờ
                </div>}
                <button onClick={() => this.goToAddReminder()}>Thêm tài khoản mới</button>
                {this.reminderList &&
                    <div>
                        <h3>Danh sách tài khoản đã lưu của bạn: </h3>
                        <ReactTable
                            getTdProps={(state, rowInfo, column, instance) => {
                                return {
                                    onClick: (e, handleOriginal) => {
                                        console.log("info", rowInfo);

                                        if (handleOriginal) {
                                            this.reminderDetail(rowInfo);
                                        }
                                    }
                                };
                            }}
                            data={this.reminderList}
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
        fetchReminderList: (id, token) => dispatch(fetchReminderList(id, token)),
    }
}

function mapStateToProps(state) {
    return {
        user: state.authentication.user,
        reminderList: state.reminderList.list
    };
}

export default connect(mapStateToProps, bindAction)(ReminderPage);