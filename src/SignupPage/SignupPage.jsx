import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class SignupPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fullname: '',
            username: '',
            password: '',
            email: '',
            phone: '',
            factor: 0,
            submitted: false
        };
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { fullname, username, password, email, phone, factor } = this.state;
        const { dispatch } = this.props;
        if (fullname && username && password && email && phone) {
            dispatch(userActions.signup(fullname, username, password, email, phone, factor));
        }
    }

    goToLogin() {
        this.props.history.push({ pathname: '/login' });
    }

    render() {
        const { signingIn } = this.props;
        const { username, password, fullname, email, phone, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <div style={{ textAlign: 'center', margin: '10px'}}>
                    <h2>Sign up</h2>
                </div>
                <br />
                <form name="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={(e) => this.handleChange(e)} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={(e) => this.handleChange(e)} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !fullname ? ' has-error' : '')}>
                        <label htmlFor="fullname">FullName</label>
                        <input type="text" className="form-control" name="fullname" value={fullname} onChange={(e) => this.handleChange(e)} />
                        {submitted && !fullname &&
                            <div className="help-block">FullName is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" value={email} onChange={(e) => this.handleChange(e)} />
                        {submitted && !email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !phone ? ' has-error' : '')}>
                        <label htmlFor="phone">Phone</label>
                        <input type="text" className="form-control" name="phone" value={phone} onChange={(e) => this.handleChange(e)} />
                        {submitted && !phone &&
                            <div className="help-block">Phone is required</div>
                        }
                    </div>
                    <br />
                    <div className="form-group">
                        <button className="btn btn-primary" style={{width: '100%'}}>Sign Up</button>
                        {signingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
                <div style={{ textAlign: 'center' }}>
                <button className="btn btn-default" onClick={() => this.goToLogin()} style={{width: '100%'}}><span className="glyphicon glyphicon-arrow-left" />&nbsp; Back to login</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { signingIn } = state.authentication;
    return {
        signingIn
    };
}

export default connect(mapStateToProps)(SignupPage);