import { Inicio } from '../pages/inicio/Inicio';
import { Credenciales } from '../pages/credenciales/Credenciales';
import { ConfCorreo } from '../pages/confirmar-correo/ConfCorreo';
import { Logo } from '../atoms/Logo';
import { GoBack } from '../atoms/GoBack';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigation } from './DrawerNavigation';
import { Login1 } from '../pages/loginSinPrelog/Login1';
import { Slider } from '../pages/slider/Slider';
import { Datos } from '../pages/datos/Datos';
import { DatosMoral } from '../pages/datos-moral/DatosMoral';
import { DrawerHomeOnb } from '../pages/home-onboarding/navigation/DrawerHomeOnb';
import { Documentos } from '../pages/documentos/Documentos';
import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Texts } from '../atoms/Texts';
import { Button } from '../atoms/Button';
import { datosInversionistaMoralStyles } from '../pages/datos-inversionista-moral/datosInversionistaMoralStyles';
import { CorreoFirmamex } from '../pages/correo-firmamex/CorreoFirmamex';
import { DocumentosMoral } from '../pages/documentos-moral/DocumentosMoral';
import { DatosPersonales } from '../pages/datos-personales/DatosPersonales';
import { CuentaCreada } from '../pages/cuenta-creada/CuentaCreada';
import { SubirDocs } from '../pages/subir-docs/SubirDocs';
import { Login } from '../pages/login/Login';
import { ForgotPassword } from '../pages/contraseña-olvidada/ForgotPassword';
import { CorreoForgotPassword } from '../pages/contraseña-olvidada/correo-forgot-password/CorreoForgotPassword';
import { Archivos } from '../pages/archivos/Archivos';
import { NewInvestment } from '../pages/NewInvestment/NewInvestment';
import { InvestmentData } from '../pages/investmentData/InvestmentData';
import { Reinversiones } from '../pages/reinversiones/Reinversiones';
import { DatosInversionistaMoral } from '../pages/datos-inversionista-moral/DatosInversionistaMoral';
import { DatosBancariosMoral } from '../pages/datos-bancarios-moral.js/DatosBancariosMoral';
import { OnboardingApp } from '../pages/onboarding-app/OnboardingApp';
import { OnboardingApp01 } from '../pages/onboarding-app01/OnboardingApp01';
import { Navigation } from './Navigation';
import { DatosInversionista } from '../pages/datos-inversionista/DatosInversionista';
import { DatosBeneficiario } from '../pages/datos-beneficiario/DatosBeneficiario';
import { InversionesHome } from '../pages/InversionesHome/InversionesHome';
import { Deposit } from '../pages/Deposit/Deposit';
import { Cuenta } from '../pages/cuenta/Cuenta';
import { Hamburger } from '../molecules/hamburger';
import { BackArrow } from '../atoms/backArrow';
import { Envelope } from '../molecules/Envelope';
import { ChangePassword } from '../pages/nueva-contraseña/ChangePassword';
import { ResetPassword } from '../pages/contraseña-olvidada/ResetPassword';
import { useNavigation } from '@react-navigation/native';
import { DocumentosHome } from '../pages/documentosHome/DocumentosHome';


export const Stacks = ({route}) => {

  const Stack = createStackNavigator();
  const navigation = useNavigation()

  const initialRouteName = route?.params?.initialRouteName ?? 'Inicio';

  const [modalVisible, setModalVisible] = useState(false);

  const showMyModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false)
    navigation.goBack()
  };


  return(
    
    <React.Fragment>
      
      <Stack.Navigator initialRouteName={initialRouteName}>
        
        <Stack.Screen 
          name='Inicio'
          component={Inicio}
          options={{
            headerShown: false
          }} 
        />

        <Stack.Screen 
          name='Credenciales'
          component={Credenciales}
          options={{
            headerTitle: Logo,
            headerTitleAlign: 'center',
            headerLeft: GoBack
          }} 
        />
        
        <Stack.Screen 
          name='ConfCorreo'
          component={ConfCorreo}
          options={{
            headerTitle: Logo,
            headerTitleAlign: 'center',
            headerTransparent: true,
            headerLeft: GoBack
          }}
        />     

        <Stack.Screen
          name='Login1'
          component={Login1}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen 
          name='Sesion-Regular'
          component={DrawerNavigation}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen 
            name='Login'
            component={Login}
            options={{
            headerShown: false,
            }}
        />

        <Stack.Screen
            name='Recuperar-Password'
            component={ForgotPassword}
            options={{
                headerTitle: Logo,
                headerTitleAlign: 'center',
                headerLeft: GoBack
            }}
        />

        <Stack.Screen
            name='Correo-Password'
            component={CorreoForgotPassword}
            options={{
                headerTitle: Logo,
                headerTitleAlign: 'center',
                headerLeft: GoBack
            }}
        />

        <Stack.Screen
            name='ChangePassword'
            component={ChangePassword}
            options={{
                headerTitle: Logo,
                headerTitleAlign: 'center',
                headerLeft: GoBack
            }}
        />

        <Stack.Screen 
          name='ResetPassword'
          component={ResetPassword}
          options={{
            headerShown: false
          }} 
        />

        <Stack.Screen
            name='Archivos'
            component={Archivos}
            options={{
                headerTitle: 'Mis inversiones',
                headerTintColor: '#222222',
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerLeft: (props) => <BackArrow color='#000000' />,
                headerTitleStyle: {
                    fontFamily: 'Poppins-SemiBold',
                },
            }}
        />

        <Stack.Screen
            name='Documentos'
            component={DocumentosHome}
            options={{
                headerTitle: 'Documentación',
                headerTintColor: '#222222',
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerLeft: (props) => <BackArrow color='#000000' />,
                headerTitleStyle: {
                    fontFamily: 'Poppins-SemiBold',
                },
            }}
        />

        {/* <Stack.Screen 
          name='Inversiones'
          component={InversionesHome}
          options={
            {
              headerTitle: '',
              headerTitleAlign: 'left',
              headerTransparent: true,
              headerLeft: Hamburger,
              headerRight: Envelope,
              headerStyle: {
                height: 80,
              }
            }
          }
        
        />    */}

        <Stack.Screen 
            name='Depositar'
            component={Deposit}
            options={{
                headerTitle: 'Mis Inversiones',
                headerTitleAlign: 'center',
                headerTransparent: true, 
                headerLeft: (props) => <BackArrow color='#000000' />
            }} 
        />

        <Stack.Screen 
            name='Cuenta'
            component={Cuenta}
            options={{
                headerTitle: '',
                headerTransparent: true, 
                headerLeft: GoBack
            }} 
        />

        <Stack.Screen
            name='Nueva-Inversion'
            component={NewInvestment}
            options={{
                headerTitle: 'Nueva inversión',
                headerTintColor: '#14DA13',
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerLeft: (props) => <BackArrow color='#FFFFFF' />,
                headerTitleStyle: {
                    fontFamily: 'Poppins-SemiBold', 
                },
            }}
                />

        <Stack.Screen 
            name='InversionData'
            component={InvestmentData}
            options={{
                headerShown: false,
                headerTitle: '',
                headerTransparent: true, 
            }} 
        />

        <Stack.Screen 
            name='Reinversiones'
            component={Reinversiones}
            options={{
                headerShown: false,
                headerTitle: '',
                headerTransparent: true, 
            }} 
        />

        <Stack.Screen 
          name='Datos-Personales'
          component={DatosPersonales}
          options={{
            headerTitle: Logo,
            headerTitleAlign: 'center',
            headerTransparent: true
          }}
        />

        <Stack.Screen 
          name='Cuenta-Creada'
          component={CuentaCreada}
        />

        <Stack.Screen 
          name='Subir-Docs'
          component={SubirDocs} 
        />

        <Stack.Screen 
          name='OnboardingApp' 
          component={ OnboardingApp }
          options={{
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name='OnboardingApp01' 
          component={ OnboardingApp01 }
          options={{
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name='Navigation' 
          component={ Navigation }
          options={{
            headerShown: false
          }} 
        />

        <Stack.Screen 
          name='Slider'
          component={Slider}
          options={{
            headerTitle: Logo,
            headerTitleAlign: 'center',
            headerTransparent: true,
            headerLeft: false
          }}
        />

        <Stack.Screen 
          name='Datos'
          component={Datos}
          options={{
            headerTitle: Logo,
            headerTitleAlign: 'center',
            headerTransparent: true,
          }}
        />

        <Stack.Screen 
          name='Datos-Moral'
          component={DatosMoral}
          options={{
            headerTitle: Logo,
            headerTitleAlign: 'center',
            headerTransparent: true
          }}
        />

        <Stack.Screen 
          name='Datos-inversionista-moral' 
          component={ DatosInversionistaMoral }
          options={{
            headerTitle: Logo,
            headerTitleAlign: 'center',
            headerTransparent: true,
            headerLeft: (props) => <GoBack {...props} onPress={showMyModal} />,
            headerStyle: {
              backgroundColor: '#f5f5f5',
            },
          }}
        />

        <Stack.Screen 
          name='Datos-bancarios-moral' 
          component={ DatosBancariosMoral }
          options={{
            headerTitle: Logo,
            headerTitleAlign: 'center',
            headerLeft: (props) => <GoBack {...props} onPress={showMyModal} />,
            headerTransparent: true,
            headerStyle: {
              backgroundColor: '#f5f5f5',
            },
          }}
        />

        <Stack.Screen 
          name='Profile'
          component={DrawerHomeOnb}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
            name='Documentacion'
            component={ Documentos }
            options={{
              headerTitle: Logo,
              headerTitleAlign: 'center',
              headerLeft: (props) => <GoBack {...props} onPress={showMyModal} />,
            }}             
        />

        <Stack.Screen
            name='Documentos-moral'
            component={ DocumentosMoral }
            options={{
              headerTitle: Logo,
              headerTitleAlign: 'center',
              headerLeft: (props) => <GoBack {...props} onPress={showMyModal} />,
            }}             
        />

        <Stack.Screen 
            name='Correo-firmamex' 
            component={ CorreoFirmamex }
            options={{
              headerTitle: Logo,
              headerTitleAlign: 'center',
              headerLeft: false,
              headerTransparent: true,
            }}
        />

        <Stack.Screen
            name='DatosInversionista'
            component={ DatosInversionista }
            options={{
              headerTitle: Logo,
              headerTitleAlign: 'center',
              // headerLeft: GoBack,
              headerLeft: (props) => <GoBack {...props} onPress={showMyModal} />,
            }}            
        />
        <Stack.Screen
            name='DatosBeneficiario'
            component={ DatosBeneficiario }
            options={{
              headerTitle: Logo,
              headerTitleAlign: 'center',
              headerLeft: (props) => <GoBack {...props} onPress={showMyModal} />,
            }} 
        />

      </Stack.Navigator>

      <Modal
            animationType="fade" 
            transparent={true}
            visible={modalVisible}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 300, backgroundColor: '#FFFFFF', borderRadius: 10, padding: 20, alignItems: 'center' }}>
              <FontAwesome5 name="info-circle" size={24} color="#14DA13" />
              <Texts type='h1' extraStyles={{ color: '#2B2B2B', marginVertical: 10, fontSize: 20}}>Advertencia</Texts>
              <Texts type='p' extraStyles={{ marginBottom: 20, textAlign: 'center' }}>Si abandonas esta sección, tendrás que llenar los datos de nuevo.</Texts>
              <View style={[datosInversionistaMoralStyles.row, {width: 260, gap: 5}]}>
              <Button type='secondary' size='btnSmall' textColor='#2B2B2B' onPress={() => setModalVisible(false)}>CANCELAR</Button>
              <Button type='primary' size='btnSmall' onPress={handleCloseModal}>SALIR</Button>
              </View>
          </View>
          </View>
      </Modal>

    </React.Fragment>
   
  );
}