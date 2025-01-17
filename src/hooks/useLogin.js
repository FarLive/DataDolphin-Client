import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import Swal from 'sweetalert2'

export const useLogin = () => {

    const[error, setError] = useState(null);
    const[isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const login = async (email, password) => {

        setIsLoading(true);
        setError(null);

        const response = await fetch( 'https://symbolic-truth-426104-r0.wl.r.appspot.com/api/user/login', {
            method : 'POST',
            headers : { 'Content-Type' : 'application/json' },
            body : JSON.stringify({email, password})
        })

        const json = await response.json();

        if( !response.ok ) {
            
            setIsLoading(false);
            setError(json.error);  

        }

        if( response.ok ) {

            // Guardar el usuario en el local storage
            localStorage.setItem( 'user', JSON.stringify(json) );

            Swal.fire('Correcto!!', `Bienvenido`, 'success' );

            //Actualizar AuthContext
            dispatch( { type : 'LOGIN',  payload : json } );

            setIsLoading(false);

        }

    };

    return{ login, isLoading, error };

}