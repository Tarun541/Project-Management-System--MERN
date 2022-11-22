export const initialState = {
    card: null,
    login: null,
    navbar: false,
    email: null
};

export const reducer = (state, action) => {
    if (action.type === 'CARD') {
        console.log(action.payload)
        return { ...state, card: action.payload };
    }
    else if (action.type === "USER") {
        return { ...state, login: action.payload }
    }
    else if (action.type === "navbar") {
        return { ...state, navbar: action.payload }
    }
    else if (action.type === "email") {
        console.log("email")
        return { ...state, email: action.payload }
    }
    return state
}