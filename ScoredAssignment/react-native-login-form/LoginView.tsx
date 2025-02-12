import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const LoginView = ({ navigation }: any) => {
    const handleLogin = () => {
        console.log('Login button pressed');
    }

    const handleSignup = () => {
        navigation.navigate('Signup');
    }

    const handleForgotPassword = () => {
        console.log('Forgot password pressed');
    }

    return (
        <ImageBackground source={require('./assets/images/10730.jpg')} resizeMode='cover' style={styles.backgroundImage}>
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>Please sign in to continue.</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <View style={styles.inputWrapper}>
                        <Ionicons name='mail-outline' size={20} color='#666' style={styles.inputIcon} />
                        <TextInput 
                            style={styles.input}
                            placeholder='Enter your email'
                            keyboardType='email-address'
                            placeholderTextColor={'#999'}
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.inputWrapper}>
                        <Ionicons name='lock-closed-outline' size={20} color='#666' style={styles.inputIcon} />
                        <TextInput 
                            style={styles.input}
                            placeholder="Enter your password"
                            secureTextEntry={true}
                            placeholderTextColor={'#999'}
                        />
                        <TouchableOpacity onPress={handleForgotPassword}>
                            <Text style={styles.forgotText}>Forgot Your Password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.loginButtonContainer} onPress={handleLogin}>
                    <LinearGradient
                        colors={['#FFD480', '#FFA500', '#FF8C00']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.loginButton}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                        <Ionicons name='arrow-forward' size={20} color= '#FFF' />
                    </LinearGradient>
                </TouchableOpacity>
                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={handleSignup}>
                        <Text style={styles.signupLink}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </ImageBackground>
    )
}

export default LoginView;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
          resizeMode: 'cover',
        },
    container: {
        flex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          padding: 20,
        },
        headerContainer: {
          marginTop: 60,
          marginBottom: 40,
        },
        title: {
          fontSize: 28,
          fontWeight: 'bold',
          color: '#000',
          marginBottom: 8,
        },
        subtitle: {
          fontSize: 16,
          color: '#666',
        },
        formContainer: {
          flex: 1,
        },
        inputContainer: {
          marginBottom: 20,
        },
        inputLabel: {
          fontSize: 12,
          color: '#666',
          marginBottom: 8,
          letterSpacing: 0.5,
        },
        passwordHeader: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        },
        forgotText: {
          fontSize: 12,
          color: '#FFA500',
          fontWeight: '500',
        },
        inputWrapper: {
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: '#E0E0E0',
          paddingHorizontal: 12,
        },
        inputIcon: {
          marginRight: 8,
        },
        input: {
          flex: 1,
          height: 48,
          fontSize: 16,
          color: '#000',
        },
        loginButtonContainer: {
          alignSelf: 'flex-end',
          marginBottom: 50,
          width: 150,
          height: 50,
          borderRadius: 25,
        },
        loginButton: {
          backgroundColor: '#FFA500',
          borderRadius: 25,
          height: 50,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'flex-end',
          marginTop: 20,
          width: 150,
        },
        buttonText: {
          color: '#FFF',
          fontSize: 14,
          fontWeight: '600',
          marginRight: 4,
        },
        buttonIcon: {
          marginLeft: 2,
        },
        signupContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        },
        signupText: {
          color: '#666',
          fontSize: 14,
        },
        signupLink: {
          color: '#FFA500',
          fontSize: 14,
          fontWeight: '500',
        },
});