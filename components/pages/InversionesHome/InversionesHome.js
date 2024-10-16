import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { API_BASE } from '@env';
import { Texts } from '../../atoms/Texts';
import { inversionesHomeStyles } from './inversionesHomeStyles';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { changePath } from "../../../redux/path/pathName";
import { reusableStyles } from '../../reusableStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { GradientCircle } from './GradientCircle';
import { StepIndicator } from '../../organisms/StepIndicator';
import { InvestmentInfo } from '../../molecules/InvestmentInfo';
import { selectInversiones } from '../../../redux/async-slices/inversionSlice';
import { useFetch } from '../../../hooks/useFetch';

const steps = [
  { bold: 'Genera tu pedido ', description: 'ingresando el ', bold2: 'monto' },
  { bold: 'Deposítalo', description: ' usando el ID como concepto' },
  { bold: 'Sube', description: ' tu comprobante' },
  { description: 'Recibe la ', bold2: 'confirmación' },
  { bold: '¡Listo!', description: ' Comenzarás a generar rendimientos' },
];

export const InversionesHome = ({route}) => {
  const routePath = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const tokenRedux = useSelector((state) => state.session.token);

  const comprobante = route.params?.comprobante

  const [sinInversiones, setSinInversiones] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [deposit, setDeposit] = useState(false);
  const [total, setTotal] = useState(0);
  const [rendimientos, setRendimientos] = useState(null);
  const [inversiones, setInversiones] = useState([])

  const chargeData = async() => {
    const apiBase = API_BASE;
    const endPoint = '/inversiones';
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${tokenRedux.access_token}`);

    const fetch = await useFetch(apiBase + endPoint, headers, 'GET', 'normal');

    if(fetch.data.length > 0){
      setInversiones(fetch.data);
    }else{
      console.log('lista vacia');
    }
  };

  const globalReturns = async () => {
    const apiBase = API_BASE;
    const endPoint = '/inversion/rendimiento/global';
    const token = tokenRedux.access_token;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    const fetch = await useFetch(apiBase + endPoint, headers, 'GET', 'normal');

    if (fetch.message === 'Rendimientos Globales') {
      console.log(fetch.data);
      setRendimientos(fetch.data.rendimiento_global);
    } else {
      console.log('error en consulta de rendimientos globales');
    }
  };

  const typeText = (type) => {
    switch (type) {
      case 1:
        return 'pendiente';
      case 2:
        return 'completado';
      case 3:
        return 'retiro';
      case 4:
        return 'reembolsado';
      default:
        return '';
    }
  };

  useEffect(() => {
    dispatch(changePath(routePath.name));
  }, [dispatch, routePath.name]);

  useFocusEffect(
    useCallback(() => {
      chargeData();
      globalReturns();
    }, [])
  );

  useEffect(() => {
    if (inversiones.length > 0) {
      const auxTotal = inversiones.reduce((acc, item) => acc + item.monto, 0);
      console.log('total: ', auxTotal);
      setTotal(auxTotal);
      setSinInversiones(false);
    } else {
      console.log('lista vacia');
      setSinInversiones(true);
    }
  }, [inversiones]);

  useFocusEffect(
    useCallback(() => {
      if (inversiones.length === 1) {
        setCurrentStep(1);
        if (deposit) {
          setCurrentStep(2);
        } 
        if (comprobante || inversiones[0].comprobantePago ) {
          setCurrentStep(3)
        }
      } else {
        setCurrentStep(0);
      }

      const completedInvestment = inversiones.find(inversion => typeText(inversion.estatus_inv_id) === 'completado');
      if (completedInvestment) {
        setCurrentStep(5);
      }
    }, [inversiones, deposit, comprobante])
  );

  const handleDepositPress = () => {
    if (inversiones.length === 1) {
      navigation.navigate('Depositar', { idInvesment: inversiones[0].id_inversion });
      setDeposit(true);
    } else {
      navigation.navigate('Depositar');
    }
  };

  return (
    <View style={inversionesHomeStyles['container']}>
      <LinearGradient
        colors={['#FFFFFF', '#F2F5FA', '#F3F6FA', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={reusableStyles.background}
      />

      <View style={inversionesHomeStyles.circleGreen}>
        <GradientCircle color='#14DA13' />
      </View>
      <View style={inversionesHomeStyles.circleBlue}>
        <GradientCircle color='#C2E0F6' />
      </View>

      <Texts type='h2' extraStyles={inversionesHomeStyles['h2']}>Mis Inversiones</Texts>

      <View style={inversionesHomeStyles['amounts']}>
        {rendimientos === "$0.00" ? (
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Texts type='h1' extraStyles={{ fontFamily: 'Poppins-Light', fontSize: 32 }}>$ 0</Texts>
            <Texts type='h1' extraStyles={{ fontFamily: 'Poppins-Light' }}>MXN</Texts>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Texts type='h1' extraStyles={{ fontFamily: 'Poppins-Light', fontSize: 32 }}>{rendimientos?.replace('$', '$  ')}</Texts>
            <Texts type='h1' extraStyles={{ fontFamily: 'Poppins-Light' }}>MXN</Texts>
          </View>
        )}
        <Texts type='pSmall'>Rendimientos generados</Texts>
      </View>

      <View style={inversionesHomeStyles['buttonsContainer']}>
        <View style={inversionesHomeStyles['interno']}>
          <TouchableOpacity style={inversionesHomeStyles['buttonImage']} onPress={() => navigation.navigate('Archivos')}>
            <FontAwesome5 name="archive" size={24} color="black" />
          </TouchableOpacity>
          <Texts type='p' extraStyles={inversionesHomeStyles['titulosBotones']}>Archivos</Texts>
        </View>

        <View style={inversionesHomeStyles['interno']}>
          <TouchableOpacity style={[inversionesHomeStyles['buttonImage'], { backgroundColor: inversiones.length === 1 && inversiones[0].estatus_inversion.id_estatus_inv === 1 ? '#FFFFFF' : '#14DA13', width: 60, height: 60 }]} onPress={() => navigation.navigate('Nueva-Inversion')}>
            <FontAwesome5 name="dollar-sign" size={24} color={inversiones.length === 1 && inversiones[0].estatus_inversion.id_estatus_inv === 1 ? "black" : "#FFFFFF"} />
          </TouchableOpacity>
          <Texts type='p' extraStyles={inversionesHomeStyles['titulosBotones']}>Invertir</Texts>
        </View>

        <View style={inversionesHomeStyles['interno']}>
          <TouchableOpacity disabled={sinInversiones} style={sinInversiones ? inversionesHomeStyles['buttonImageDisabled'] : [inversionesHomeStyles['buttonImage'], { backgroundColor: inversiones.length === 1 && inversiones[0].estatus_inversion.id_estatus_inv === 1 ? '#14DA13' : '#FFFFFF' }]} onPress={handleDepositPress}>
            <FontAwesome5 name="archway" size={24} color={inversiones.length === 1 && inversiones[0].estatus_inversion.id_estatus_inv === 1 ? 'white' : (sinInversiones ? "white" : "black")} />
          </TouchableOpacity>
          <Texts type='p' extraStyles={[inversionesHomeStyles['titulosBotones'], { color: sinInversiones ? "#D9D9D9" : '#2B2B2B' }]}>Depositar</Texts>
        </View>
      </View>

      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}>
        <View style={inversionesHomeStyles['investmentInfo']}>
          {inversiones.length === 1 && inversiones[0].estatus_inversion.id_estatus_inv === 1 ? (
            <View style={{ width: '60%', alignItems: 'flex-end', gap: 30 }}>
              <FontAwesome6 name="arrow-up-long" size={32} color="#14DA13" />
            </View>
          ) : null}

          {inversiones.length !== 0 ? (
            inversiones.slice().reverse().map((item, index) => (
              <InvestmentInfo
                key={index}
                type={typeText(item.estatus_inv_id)}
                id={item.id_inversion}
                dayPassed={item.days_lapsed}
                dayCompleted={item.fecha_finalizacion}
                refundDay={item.fecha_completado}
                amount={item.monto}
                comprobante={item.comprobantePago}
              />
            ))
          ) : (
            <View style={{ alignItems: 'center', gap: 30, marginVertical: 20 }}>
              <FontAwesome6 name="arrow-up-long" size={32} color="#14DA13" />
              <Texts type='p'>Comienza a invertir</Texts>
            </View>
          )}
          {
             inversiones.length <= 1 || inversiones[0].estatus_inversion.id_estatus_inv === 1 ? 
             <StepIndicator currentStep={currentStep} steps={steps} />
             :
             null
          }

        </View>
      </ScrollView>
          {           
              inversiones.length <= 1 ?
              null
              :
              <View style={{width: '90%', height: 160, justifyContent: 'flex-end'}} >
                <View style={inversionesHomeStyles.slide}>
                  <View>
                      <Texts type='h2' extraStyles={[inversionesHomeStyles.title, { marginBottom: 10 }] }>¡Felicidades!</Texts>
                      <Texts type='pSmall' extraStyles={[inversionesHomeStyles.title, { marginHorizontal: 25}]}>Tu inversión ya está generando rendimientos. Disfruta de otros beneficios como inversionista.</Texts>
                      <View style={{marginTop: '5%', alignItems: 'flex-end', marginRight: '1%', justifyContent: 'flex-end'}}>
                        <FontAwesome6 name="arrow-down-long" size={24} color="#14DA13" />
                      </View>
                  </View>
                </View>
              </View>
          }
    </View>
  );
};
