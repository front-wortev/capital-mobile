import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetch } from './useFetch';
import { setData, setGlobalLoading, setLoading } from '../redux/async-slices/dataSlice';

const useData = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInitialData = async () => {
      dispatch(setGlobalLoading(true));

      try {
        // Cargar datos de logo
        dispatch(setLoading({ key: 'logo', loading: true }));
        const logoResult = await useFetch('https://strapi.wortev.com/api/logo?populate=*');
        dispatch(setData({ key: 'logo', data: logoResult.data.attributes }));

        // Cargar datos de inicio
        dispatch(setLoading({ key: 'inicio', loading: true }));
        const inicioResult = await useFetch('https://strapi.wortev.com/api/inicio?populate=*');
        dispatch(setData({ key: 'inicio', data: inicioResult.data.attributes }));

        // Cargar Credenciales
        dispatch(setLoading({ key: 'credenciales', loading: true }));
        const credencialesResult = await useFetch('https://strapi.wortev.com/api/registro-credencial');
        dispatch(setData({ key: 'credenciales', data: credencialesResult.data.attributes }));

        // Cargar ConfCorreo
        dispatch(setLoading({ key: 'confCorreo', loading: true }));
        const confCorreoResult = await useFetch('https://strapi.wortev.com/api/conf-correo');
        dispatch(setData({ key: 'confCorreo', data: confCorreoResult.data.attributes }));

        // Cargar PersonType
        dispatch(setLoading({ key: 'personType', loading: true }));
        const personTypeResult = await useFetch('https://strapi.wortev.com/api/tipo-persona');
        dispatch(setData({ key: 'personType', data: personTypeResult.data.attributes }));

        // Cargar SubirDocs
        dispatch(setLoading({ key: 'subirDocs', loading: true }));
        const subirDocsResult = await useFetch('https://strapi.wortev.com/api/subir-doc?populate=*');
        dispatch(setData({ key: 'subirDocs', data: subirDocsResult.data.attributes }));

        // Cargar CuentaCreada
        dispatch(setLoading({ key: 'cuentaCreada', loading: true }));
        const cuentaCreadadResult = await useFetch('https://strapi.wortev.com/api/registro-cuenta-creada');
        dispatch(setData({ key: 'cuentaCreada', data: cuentaCreadadResult.data.attributes }));

        // Cargar ForgotPassword
        dispatch(setLoading({ key: 'forgotPassword', loading: true }));
        const forgotPasswordResult = await useFetch('https://strapi.wortev.com/api/login-forgot-password?populate=*');
        dispatch(setData({ key: 'forgotPassword', data: forgotPasswordResult.data.attributes }));

        // Cargar CorreoForgotPassword
        dispatch(setLoading({ key: 'correoForgotPassword', loading: true }));
        const correoForgotPasswordResult = await useFetch('https://strapi.wortev.com/api/login-correo-forgot-password?populate=*');
        dispatch(setData({ key: 'correoForgotPassword', data: correoForgotPasswordResult.data.attributes }));

        // Cargar Slide Images
        dispatch(setLoading({ key: 'slideImages', loading: true }));
        const slideImagesResult = await useFetch('https://strapi.wortev.com/api/slide?populate=*');
        dispatch(setData({ key: 'slideImages', data: slideImagesResult.data }));

        // Cargar Datos Deposito
        dispatch(setLoading({ key: 'datosDeposito', loading: true }));
        const datosDepositoResult = await useFetch('https://strapi.wortev.com/api/inversiones-depositar');
        dispatch(setData({ key: 'datosDeposito', data: datosDepositoResult.data }));

        // Cargar Datos Correo Firmamex
        dispatch(setLoading({ key: 'correoFirmamex', loading: true }));
        const correoFirmamexResult = await useFetch('https://strapi.wortev.com/api/firmamex-correo-firmamex');
        dispatch(setData({ key: 'correoFirmamex', data: correoFirmamexResult.data }));

        // Cargar Datos Modal Firmamex
        dispatch(setLoading({ key: 'modalFirmamex', loading: true }));
        const modalFirmamexResult = await useFetch('https://strapi.wortev.com/api/firmamex-modal?populate=*');
        dispatch(setData({ key: 'modalFirmamex', data: modalFirmamexResult.data }));
      }
      catch(err){
        console.log(err, 'sss')
      }

      dispatch(setGlobalLoading(false));
    };

    fetchInitialData();
  }, [dispatch]);
};

export default useData;
