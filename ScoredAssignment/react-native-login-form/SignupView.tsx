import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

const SignupView = ({ navigation }: any) => {
    const handleSignup = () => {
        console.log('Signup button pressed');
    }

    const handleBack = () => {
        navigation.goBack();
    }

    return (
        <ImageBackground source={require('./assets/images/10730.jpg')} resizeMode='cover' style={styles.backgroundImage}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Ionicons name='arrow-back' size={24} color={'#999'} />
                </TouchableOpacity>
                <Text style={styles.title}>Create Account</Text>
                <View style={styles.formContainer}>
                        <Text style={styles.inputLabel}>Full Name</Text>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="person-outline" size={20} color={'#666'} style={styles.inputIcon} />
                                <TextInput 
                                    style={styles.input}
                                    placeholder='Enter your full name'
                                    placeholderTextColor={'#999'}
                                    /> 
                            </View>
                        </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="mail-outline" size={20} color={'#666'} style={styles.inputIcon} />
                            <TextInput 
                                style={styles.input}
                                placeholder='Email'
                                keyboardType='email-address'
                                placeholderTextColor={'#999'}
                                />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Password</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="lock-closed-outline" size={20} color={'#666'} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder='Password'
                                secureTextEntry={true}
                                placeholderTextColor={'#999'}
                                />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Password Confirmation</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="lock-closed-outline" size={20} color={'#666'} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder='Confirm Password'
                                secureTextEntry={true}
                                placeholderTextColor={'#999'}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.signupButtonContainer} onPress={handleSignup}>
                        <LinearGradient
                            colors={['#FFD480', '#FFA500', '#FF8C00']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.signupButton}
                            >
                            <Text style={styles.buttonText}>Sign Up</Text>
                            <Ionicons name="arrow-forward" size={16} color={'#FFF'} style={styles.buttonIcon} />
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={styles.signinContainer}>
                        <Text style={styles.signinText}>Login with existing account </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.signinLink}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default SignupView;

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
    backButton: {
      marginTop: 40,
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 30,
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
    signupButtonContainer: {
      alignSelf: 'flex-end',
      marginBottom: 50,
      width: 150,
      height: 50,
      borderRadius: 25,
    },
    signupButton: {
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
    signinContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    signinText: {
      color: '#666',
      fontSize: 14,
    },
    signinLink: {
      color: '#FFA500',
      fontSize: 14,
      fontWeight: '500',
    },
  });
  