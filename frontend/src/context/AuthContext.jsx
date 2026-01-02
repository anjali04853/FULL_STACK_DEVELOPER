import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false
            };
        case 'LOGOUT':
        case 'AUTH_ERROR':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const loadUser = async () => {
        if (localStorage.token) {
            axios.defaults.headers.common['x-auth-token'] = localStorage.token;
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
            dispatch({ type: 'AUTH_ERROR' });
            return;
        }

        try {
            console.log('Loading user...');
            const res = await axios.get('/api/auth/user');
            console.log('User loaded:', res.data);
            dispatch({ type: 'USER_LOADED', payload: res.data });
        } catch (err) {
            console.error('Load user failed:', err);
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 5000 // 5 seconds timeout
        };
        try {
            console.log('Attempting login...');
            const res = await axios.post('/api/auth/login', formData, config);
            console.log('Login success - Token received:', res.data.token ? 'Yes' : 'No');

            // Explicitly set token here to ensure it's available for loadUser immediately
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['x-auth-token'] = res.data.token;

            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });

            console.log('Fetching user profile...');
            await loadUser();
        } catch (err) {
            console.error('Login error:', err);
            let msg = 'Login Failed';
            if (err.code === 'ECONNABORTED') msg = 'Server took too long to respond. Is it running?';
            else if (err.response?.data?.message) msg = err.response.data.message;
            else if (err.message) msg = err.message;
            alert(msg);
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    const register = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            console.log('Registering user:', formData.email);
            const res = await axios.post('/api/auth/register', formData, config);
            console.log('Registration success:', res.data);
            dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
            loadUser();
            return { success: true };
        } catch (err) {
            console.error('Registration Error:', err);

            // Determine error message more robustly
            let msg = 'Registration Failed';
            if (err.response) {
                // Server responded with a status code
                if (err.response.data && err.response.data.message) {
                    msg = err.response.data.message; // e.g. "User already exists"
                } else if (typeof err.response.data === 'string') {
                    msg = err.response.data; // e.g. "Server Error"
                } else {
                    msg = `${err.response.status} Error`;
                }
            } else if (err.request) {
                // Request made but no response received
                msg = 'No response from server. Is backend running?';
            } else {
                // Something else happened
                msg = err.message;
            }

            // FORCE SHOW ALERT
            alert(msg);

            dispatch({ type: 'AUTH_ERROR' });
            return { success: false, error: msg };
        }
    };

    const logout = () => dispatch({ type: 'LOGOUT' });

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
