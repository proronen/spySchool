import actionTypes from "./actionTypes";

export const loginSpy = (data, cb) => (dispatch, getState) => {
    fetch('getToken', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        dispatch({
            type:  actionTypes.LOGIN,
            payload: res
        })

        localStorage.setItem('token', res.token);
        cb();
    })
    .catch(error => dispatch({
        type:  actionTypes.SERVER_ERORRS,
        payload: error
    }))
}

export const getUser = (jwtToken, cb) => (dispatch, getState) => {
    
    fetch('getUser', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
    .then(res => res.json())
    .then(res => {
        dispatch({
            type:  actionTypes.USER,
            payload: res
        })

        localStorage.setItem('token', res.token);
        cb()
    })
    .catch(error => {
        dispatch({
            type:  actionTypes.SERVER_ERORRS,
            payload: error
        })
    })
}

export const start_spylog = () => (dispatch, getState) => {

    const dirs = getState().foldersReducer.selectedDirs;

    if(dirs && dirs.length > 0) {
        
        dispatch({
            type:  actionTypes.ERROR_MESSAGES,
            payload: null
        })

        fetch('/start', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({folders: dirs}) 
        })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type:  actionTypes.START_SPYLOG,
                payload: res
            })
        })
        .catch(error => {
            dispatch({
                type:  actionTypes.SERVER_ERORRS,
                payload: error
            })
        })
    } else {
        dispatch({
            type:  actionTypes.ERROR_MESSAGES,
            payload: "Please select at least one folder"
        })
    }
}

export const populize_spylog = msg => (dispatch, getState) => {

    const spyData = getState().spylogReducer.spyData;

    dispatch({
        type:  actionTypes.POPULIZE_SPYLOG,
        payload: spyData +"|"+msg
    })
}

export const stop_spylog = () => (dispatch, getState) => {

    const dirs = getState().foldersReducer.selectedDirs;
    fetch('/stop', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({folders: dirs}) 
    })
    .then(res => res.json())
    .then(res => {
        dispatch({
            type:  actionTypes.STOP_SPYLOG,
            payload: res
        })
    }).catch(error => {
        dispatch({
            type:  actionTypes.SERVER_ERORRS,
            payload: error
        })
    })
}

export const getFolders = data => dispatch => {

    // This should be a POST router and authorized
    // I have chosen passport to later use it with facebook and google login,
    // But because of time limitations and having an issue with passport token i cannot resolve at the moment
    // I am exposing this route only for this excercise. 

    fetch('/getFolders')
    .then(res => res.json())
    .then(res => {
        dispatch({
            type:  actionTypes.GET_FOLDERS,
            payload: res 
        })
    })
    .catch(error => console.log(error));
}

export const select_dirs = dir => (dispatch, getState) => {
    const selectedDirsArr = getState().foldersReducer.selectedDirs;
        
    let selectedDirs;
    if(!selectedDirsArr.includes(dir)){
        selectedDirs = [...selectedDirsArr, dir];
    } else {
        selectedDirs = selectedDirsArr.filter((item) => item !== dir) 
    }
    dispatch({
        type:  actionTypes.SELECT_DIRS,
        payload: selectedDirs
    })
}

