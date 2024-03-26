import React, { useState } from 'react';
import styles from './Signup.module.css';
import allImages from '../../constants/imagePath';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={styles.signupPageMainContainer}>
            <div className={styles.signupBoxContainer}>
                <img src={allImages?.loginSignupBoxImg} alt='' />
                <Input value={name} setter={setName} type={'text'} placeholder={'Enter Name'} />
                <Input value={email} setter={setEmail} type={'email'} placeholder={'Enter Email Address'} />
                <Input value={password} setter={setPassword} type={'password'} placeholder={'Enter Password'} />
                <Button btnText={'Signup'} className={styles.signupBtn} />
                <p className={styles.orKeywordStyling}>OR</p>
                <Link to='/login' className={styles.alreadyHaveAccountLink}>Already Have An Account?</Link>
                <hr />
                <Link to='/' className={styles.goToHomeLink}>Go To Home &nbsp;<AiFillHome /></Link>
            </div>
        </div>
    )
}

export default Signup;