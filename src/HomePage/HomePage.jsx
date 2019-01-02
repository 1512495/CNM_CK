import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchAccountList } from '../_actions/account.actions';

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

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hello {this.state.user.username}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>

                {this.accountList &&
                    <ul>
                        {this.accountList.map((account, index) =>
                            <li key={account.id}>
                                {account.account_number + ' ' + account.balance}
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                <button></button>
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