import React, { useState } from 'react';
import styles from './Login.module.css';
import allImages from '../../constants/imagePath';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import validator from 'validator';
import { loginApi } from '../../api';
import showToast from '../../utils/Toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/userSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        if (!validator.isEmail(email) || validator.isEmpty(password)) {
            showToast('error', 'Please Fill In All The Required Fields Correctly!');
        }
        else {
            setLoading(true);
            loginApi({ email, password }).then((res) => {
                if (res?.data?.status !== 'success') {
                    showToast('error', res?.data?.message);
                    return;
                }
                showToast('success', res?.data?.message);
                navigate('/');
                const user = res?.data?.data;
                dispatch(login(user));
            }).catch((err) => {
                showToast('error', err?.message);
            }).finally(() => setLoading(false));
        }
    }

    return (
        <div className={styles.loginPageMainContainer}>
            <div className={styles.loginBoxContainer}>
                <img src={allImages?.loginSignupBoxImg} alt='' />
                <Input value={email} setter={setEmail} type={'email'} placeholder={'Enter Email Address...'} disabled={loading} />
                <Input value={password} setter={setPassword} type={'password'} placeholder={'Enter Password...'} disabled={loading} />
                <div className={styles.containerDivOfLoginBtn}>
                    <Button btnText={'Login'} className={styles.loginBtn} loading={loading} onClick={handleLogin} />
                </div>
                <p className={styles.orKeywordStyling}>OR</p>
                <Link to='/signup' className={styles.createAnAccountLink}>Create An Account</Link>
                <hr />
                <Link to='/' className={styles.goToHomeLink}>Go To Home &nbsp;<AiFillHome /></Link>
            </div>
        </div>
    )
}

export default Login;