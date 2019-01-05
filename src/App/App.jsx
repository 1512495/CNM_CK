import React from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { StaffRoute } from '../_components/StaffRoute';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import TransferPage from '../TransferPage/TransferPage';
import ListUserPage from '../ListUserPage/ListUserPage';
import AddUserPage from '../AddUserPage/AddUserPage';


class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
        if (history.location.pathname == '/login' || history.location.pathname == '/signup') {
            this.isLogged = false;
        }
        else {
            this.isLogged = true;
        }

        this.isStaff = false;
        if (history.location.pathname == '/listUserPage') {
            this.isStaff = true;
        }
        else {
            this.isStaff = false;
        }
    }

    componentWillReceiveProps(next) {
        if (history.location.pathname == '/login' || history.location.pathname == '/signup') {
            this.isLogged = false;
        }
        else {
            this.isLogged = true;
        }
        if (history.location.pathname == '/listUserPage') {
            this.isStaff = true;
        }
        else {
            this.isStaff = false;
        }
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="col-sm-12">
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <div>
                        {this.isLogged &&
                            <ul>
                                {!this.isStaff &&
                                    <div>
                                        <li><Link to="/">Trang chủ</Link></li>
                                        <li><Link to="/transfer">Chuyển tiền</Link></li>
                                        <li><a href="#contact">Danh sách người nhận</a></li>
                                        <li><a href="#contact">Lịch sử</a></li>
                                    </div>
                                }
                                <li style={{ float: 'right' }}><Link to="/login">Đăng xuất</Link></li>
                            </ul>
                        }
                        <div className="col-sm-8 col-sm-offset-2">

                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute exact path="/transfer" component={TransferPage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/signup" component={SignupPage} />
                                <Route path="/adduser" component={AddUserPage} />
                                <StaffRoute path="/listUserPage" component={ListUserPage} />
                                <Route component={NotFoundPage} />
                            </Switch>
                        </div>

                    </div>
                </Router >
            </div >
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

export default connect(mapStateToProps)(App);