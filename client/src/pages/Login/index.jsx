import React, { useState } from 'react';
import styles from './Login.module.css';
import allImages from '../../constants/imagePath';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={styles.loginPageMainContainer}>
            <div className={styles.loginBoxContainer}>
                <img src={allImages?.loginSignupBoxImg} alt='' />
                <Input value={email} setter={setEmail} type={'email'} placeholder={'Enter Email Address'} />
                <Input value={password} setter={setPassword} type={'password'} placeholder={'Enter Password'} />
                <Button btnText={'Login'} className={styles.loginBtn} />
                <p className={styles.orKeywordStyling}>OR</p>
                <Link to='/signup' className={styles.createAnAccountLink}>Create An Account</Link>
                <hr />
                <Link to='/' className={styles.goToHomeLink}>Go To Home &nbsp;<AiFillHome /></Link>
            </div>
        </div>
    )
}

export default Login;