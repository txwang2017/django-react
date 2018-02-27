import {setUserInfo} from '../header/actions';

export const setSignInError = errorMessage => {
    return {type: 'SET_SIGN_IN_ERROR', errorMessage};
};

export const setSignUpError = errorMessage => {
    return {type: 'SET_SIGN_UP_ERROR', errorMessage};
};

export const signUp = (username, email, password1, password2) => dispatch => {
    if (password1 !== password2) {
        dispatch(setSignUpError('Please enter the same password'));
    }
    else {
        let isAuthenticated = false;
        fetch('../api/accounts/sign-up/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email, password1, password2})
        }).then(
            response => {
                if (response.status === 200) {
                    isAuthenticated = true;
                    return response.json();
                } else{
                    return {};
                }
            }
        ).then(
            userInfo => {
                if (isAuthenticated === true) {
                    userInfo.isAuthenticated = isAuthenticated;
                    dispatch(setSignUpError(''));
                    dispatch(setUserInfo(userInfo));
                } else {
                    dispatch(setSignUpError('Email already existed'));
                }
            }
        ).catch(
            () => {
                dispatch(setSignUpError('Email already existed'));
            }
        )
    }
};

export const signIn = (email, password) => dispatch => {
    let isAuthenticated = false;
    fetch('../api/accounts/sign-in/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
    }).then(
        response => {
            if (response.status === 200) {
                isAuthenticated = true;
            }
            if(response.ok){
                return response.json();
            } else{
                return {};
            }
        }
    ).then(
        userInfo => {
            if(isAuthenticated === true){
                userInfo.isAuthenticated = isAuthenticated;
                dispatch(setSignInError(''));
                dispatch(setUserInfo(userInfo));
            } else{
                dispatch(setSignInError('Username/Password is not correct'));
            }
        }
    )
};