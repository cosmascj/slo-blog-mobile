import { QueryCache, useQueryClient } from '@tanstack/react-query';
import React, { createContext, useEffect, useReducer, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import EncryptedStorage from 'react-native-encrypted-storage';
interface Props {
    children: React.ReactNode;
}

const initialState: AuthState = {
    loading: true,
    onboarded: false,
    token: '',
    user: null,
    userType: 'user',
};
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_TOKEN':
            return { ...state, token: action.payload };
        case 'SET_ONBOARDED':
            return { ...state, onboarded: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'LOGOUT':
            console.log('🚀 ~ file: AuthContext.tsx:41 ~ authReducer ~ state:', state);
            return {
                ...initialState,
                loading: false,
                onboarded: state.onboarded,
            };
        default:
            return state;
    }
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: Props): JSX.Element => {

    const [state, dispatch] = useReducer(authReducer, initialState);
    const queryCache = new QueryCache({});
    const queryClient = useQueryClient()

    const logout = () => {

        queryCache.clear();
        dispatch({ type: 'LOGOUT' });
        void EncryptedStorage.removeItem('appToken')
        void EncryptedStorage.removeItem('user')

    };
    const setIsOnboarded = () => {
        dispatch({
            payload: true,
            type: 'SET_ONBOARDED',
        });
        EncryptedStorage.setItem('isOnboarded', 'true');
        // SecureStore.setItemAsync('isOnboarded', 'true');
    };

    const setLoading = (loading: boolean) => {
        dispatch({
            payload: loading,
            type: 'SET_LOADING',
        });
    };

    const setUser = async (userData: LoginResponseData) => {
        dispatch({
            payload: userData,
            type: 'SET_USER',
        });
        EncryptedStorage.setItem('user', JSON.stringify(userData));


    };

    // const setToken = (userToken: string) => { }
    const setToken = (userToken: LoginResponse) => {
        try {
            // const decoded = jwtDecode(userToken || '') as UserTokenType;
            console.log('🚀 ~ file: AuthContext.tsx:s89 ~ setToken ~ decoded:', userToken);

            setUser(userToken.data);

            dispatch({
                payload: userToken.data?.token,
                type: 'SET_TOKEN',
            });
            // AsyncStorage.setItem('token2', JSON.stringify(userToken));
            void EncryptedStorage.setItem('appToken', JSON.stringify(userToken))

        } catch (error) {
            console.warn(error, 'SAVE FAILED');
            EncryptedStorage.removeItem('appToken');
            dispatch({
                payload: '',
                type: 'SET_TOKEN',
            });
        }
    };
    const getUserData = async () => {

        try {
            const isOnboarded = await EncryptedStorage.getItem('isOnboarded')

            if (isOnboarded) {
                dispatch({
                    payload: isOnboarded === 'true',
                    type: 'SET_ONBOARDED',
                });
            }

            const userData = await EncryptedStorage.getItem('user');

            if (userData) {
                const userJSON: LoginResponseData = JSON.parse(userData);

                const expiry = new Date(0);

                // expiry.setUTCSeconds(userJSON?.exp || 0);
                // console.log('EXPIRY', expiry);

                if (userJSON) {
                    setUser(userJSON)

                    const userToken = await EncryptedStorage.getItem('appToken');
                    const test = JSON.parse(userToken || '')
                    if (userToken) {

                        setToken(test);
                        console.log('🚀 ~ file: AuthContext.tsx:899 ~ getUser data ~ decoded:', JSON.parse(userToken));
                    }
                } else {
                    throw new Error('USER VERIFICATION FAILED');
                }
            }
            setLoading(false)
            console.log('here is loader')
        } catch (error) {
            console.warn(error);
            logout();
        } finally {
            console.log('finally')
            setLoading(false)
        }
    };


    useEffect(() => {
        getUserData();
        // logout()
    }, []);

    const authState: AuthContextType = {
        ...state,
        logout,
        setIsOnboarded,
        setUser,
        setToken
    };

    return (
        <View style={{ flex: 1 }}>
            {state.loading ? (
                <ActivityIndicator />
            ) : (
                <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
            )}
        </View>
    )
}
export default AuthContextProvider;
