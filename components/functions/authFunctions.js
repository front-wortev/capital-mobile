import { API_BASE } from '@env';
import { success, userName, userEmail } from '../../redux/async-slices/auth/authSlice';
import { useFetch } from '../../hooks/useFetch';
import { setUserData } from '../../redux/async-slices/user/userActions';
import { guardarInversiones } from '../../redux/async-slices/inversionSlice';

export const handleLogin = async (email, password, navigation, dispatch) => {
    try {
        const apiBase = API_BASE;
        const endPoint = '/login';
        const user = {
            email: email,
            password: password,
        };

        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");

        const fetchResponse = await useFetch(apiBase + endPoint, headers, 'POST', user, 'normal');

        if (!fetchResponse.error && fetchResponse.message === 'Inicio de sesión autorizado') {
            dispatch(success(fetchResponse.data));
            const userData = await chargeDataUser(fetchResponse.data, dispatch, navigation);
            return { success: true, userData };
        } else {
            return { success: false, message: fetchResponse.message || 'Error desconocido durante el inicio de sesión' };
        }
    } catch (error) {
        console.error("Login failed:", error);
        return { success: false, message: 'Error crítico al iniciar sesión' };
    }
}

const capitalizeWords = (str) => {
    return str.toLowerCase().replace(/(^|\s)\S/g, function(char) {
        return char.toUpperCase();
    });
}

const chargeDataInversiones = async (token, dispatch) => {
    const apiBase = API_BASE;
    const endPoint = '/inversiones';

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    const fetchResponse = await useFetch(apiBase + endPoint, headers, 'GET', 'normal');

    if (fetchResponse.data && fetchResponse.data.length > 0) {
        dispatch(guardarInversiones(fetchResponse.data));
    } else {
        console.log('lista vacia');
    }
}

const chargeDataUser = async (token, dispatch, navigation) => {
    const apiBase = API_BASE;
    const endPoint = '/perfil';
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token.access_token}`);

    const fetchResponse = await useFetch(apiBase + endPoint, headers, 'GET', 'normal');

    if (fetchResponse.data && fetchResponse.data.length > 0) {
        const userData = fetchResponse.data[0];
        const formattedUserData = {
            ...userData,
            first_name: capitalizeWords(userData.first_name),
            last_name: capitalizeWords(userData.last_name),
        };
        dispatch(userName(formattedUserData.first_name));
        dispatch(setUserData(formattedUserData));
        dispatch(userEmail(formattedUserData.email));

        const { perfil, person_type, verificado } = formattedUserData;

        await chargeDataInversiones(token.access_token, dispatch);

        if (verificado === 1) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Sesion-Regular' }],
            });
        } else if (perfil !== null && perfil.profile_completed === true) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Profile' }],
            });
        } else {
            if (person_type === null) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Datos-Personales' }],
                });
            } else {
                if (person_type === 'persona_fisica_sf') {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Datos' }],
                    });
                } else if (person_type === 'persona_moral') {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Datos-Moral' }],
                    });
                }
            }
        }

        return formattedUserData;
    }
    return null;

}

