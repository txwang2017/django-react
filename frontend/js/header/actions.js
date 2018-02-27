export const setUserInfo = (userInfo) => {
    return {type: 'SET_USER_INFO', userInfo};
};

export const checkAuthentication = () => dispatch => {
    let isAuthenticated = false;
    fetch('../api/accounts/check-authentication/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(
        response => {
            if(response.status === 200){
                isAuthenticated = true;
                return response.json();
            } else{
                return {};
            }
        }
    ).then(
        userInfo => {
            userInfo.isAuthenticated = isAuthenticated;
            dispatch(setUserInfo(userInfo));
        }
    )
};

export const signOut = () => dispatch => {
    const userInfo = {
        email: '',
        isAuthenticated: false
    };
    fetch('../api/accounts/sign-out/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(
        () => {
            dispatch(setUserInfo(userInfo));
        }
    )
};