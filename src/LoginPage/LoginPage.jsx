import React from 'react';
import { connect } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha'
import { userActions } from '../_actions';
import ToggleButton from 'react-toggle-button';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false,
            isStaff: false,
        };

    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (this.state.isStaff == true) {
            if (username && password) {
                dispatch(userActions.loginStaff(username, password));
            }
        } else {
            if (username && password) {
                dispatch(userActions.login(username, password));
            }
        }

    }

    goToSignup() {
        this.props.history.push({ pathname: '/signup' });
    }

    handleCaptchaResponseChange(response) {
        this.setState({
          recaptchaResponse: response,
        });
      }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="col-md-5 col-md-offset-4">
                <br /><br />
                <div className="alert alert-info">
                    Tên đăng nhập: user<br />
                    Mật khẩu: user
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h2>Đăng nhập</h2>
                </div>
                <div style={{ float: 'right' }}>
                    <ToggleButton
                        inactiveLabel={'User'}
                        activeLabel={'Staff'}
                        value={this.state.isStaff}
                        onToggle={(value) => {
                            this.setState({
                                isStaff: !value,
                            })
                    }} />
                </div>
                <br />
                <br />
                <form name="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={(e) => this.handleChange(e)} />
                        {submitted && !username &&
                            <div className="help-block">Tên đăng nhập không được để trống</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Mật khẩu</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={(e) => this.handleChange(e)} />
                        {submitted && !password &&
                            <div className="help-block">Mật khẩu không được để trống</div>
                        }
                    </div>

                    <ReCAPTCHA
                        ref={(el) => { this.recaptcha = el; }}
                        sitekey="6LdJB24UAAAAABTCJiRERbKstFsIfpiLoXurkUZS"
                        onChange={this.handleCaptchaResponseChange}
                        style={{ margin: '0px 12px' }}
                    />

                    <br />
                    <div style={{ textAlign: 'center' }}>

                    <div className="form-group">
                        <button className="btn btn-primary" style={{ width: '100%' }}>Đăng nhập</button>
                        {loggingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                    </div>
                </form>
                <button className="btn btn-default" onClick={() => this.goToSignup()} style={{ width: '100%' }}>Đăng kí ngay &nbsp;<span className="glyphicon glyphicon-arrow-right"/></button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

export default connect(mapStateToProps)(LoginPage);