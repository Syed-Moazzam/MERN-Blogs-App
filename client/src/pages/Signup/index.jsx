import React, { useState } from 'react';
import styles from './Signup.module.css';
import allImages from '../../constants/imagePath';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import validator from 'validator';
import showToast from '../../utils/Toast';
import { signupApi } from '../../api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSignup = async () => {
        if (validator.isEmpty(username) || !validator.isEmail(email) || validator.isEmpty(password)) {
            showToast('error', 'Please Fill In All The Required Fields Correctly!');
        }
        else {
            setLoading(true);
            signupApi({ username, email, password }).then((res) => {
                if (res?.data?.status !== 'success') {
                    showToast('error', res?.data?.message);
                    return;
                }
                showToast('success', res?.data?.message);
                navigate('/login');
            }).catch((err) => {
                showToast('error', err?.message);
            }).finally(() => setLoading(false));
        }
    }

    return (
        <div className={styles.signupPageMainContainer}>
            <div className={styles.signupBoxContainer}>
                <img src={allImages?.loginSignupBoxImg} alt='' />
                <Input value={username} setter={setUsername} type={'text'} placeholder={'Enter Name...'} disabled={loading} />
                <Input value={email} setter={setEmail} type={'email'} placeholder={'Enter Email Address...'} disabled={loading} />
                <Input value={password} setter={setPassword} type={'password'} placeholder={'Enter Password...'} disabled={loading} />
                <Button btnText={'Signup'} className={styles.signupBtn} loading={loading} onClick={handleSignup} />
                <p className={styles.orKeywordStyling}>OR</p>
                <Link to='/login' className={styles.alreadyHaveAccountLink}>Already Have An Account?</Link>
                <hr />
                <Link to='/' className={styles.goToHomeLink}>Go To Home &nbsp;<AiFillHome /></Link>
            </div>
        </div>
    )
}

export default Signup;