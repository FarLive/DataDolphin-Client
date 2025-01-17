import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };

        case 'LOGOUT':
            return { user: null };

        case 'UPDATE_USER':
            return { user: { ...state.user, ...action.payload } };

        default:
            return state;
    }
};

export const AuthContextProvider = ( { children } ) => {

    const [state, dispatch] = useReducer( authReducer, { user : null } );

    //Validar el estado inicial para saber si cerro o abrio sesion

    useEffect(() => {
        
        const user = JSON.parse( localStorage.getItem('user') );

        //Colocara el estado actual del usuario dependiendo del local storage

        if( user ) {
            dispatch( { type : 'LOGIN', payload : user } )
        }

    }, [])
    

    return (
        <AuthContext.Provider value = { { ...state, dispatch } } >
            { children }
        </AuthContext.Provider>
    );

}