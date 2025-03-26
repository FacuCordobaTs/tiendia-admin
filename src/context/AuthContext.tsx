import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "../firebase";
import { PaymentModal } from "@/components/PaymentModal";

type TimeSlot = {
  start: string;
  end: string;
};

type DaySchedule = {
  name: string;
  active: boolean;
  timeSlots: TimeSlot[];
};

interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  shopname: string;
  profileImageURL: string | null;
  address: string | null;
  fcmToken: string | null;
  createdAt: string;
  plan: string | null;
  category: string | null;
  lastPaymentDate: string | null;
  nextPaymentDate: string | null;
  mp_access_token: string | null;
  mp_refresh_token: string | null;
  mp_token_expires: number | null;
  connected_mp: number | null;
  businessHours?: DaySchedule[];
  paymentMethod?: 'mercadopago' | 'whatsapp' | null; // Nuevo campo
  whatsappNumber?: string | null; // Nuevo campo
};

interface SignUpUserInfo {
  email: string | null;
  password: string | null;
  shopname: string | null;
  username: string | null;
  address: string | null;
  category: string | null;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: () => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  updateProfile: (
    username: string,
    shopname: string,
    address: string,
    imageBase64: string,
    businessHours?: DaySchedule[],
    paymentMethod?: 'mercadopago' | 'whatsapp',
    whatsappNumber?: string
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  signUpInfo: SignUpUserInfo;
  setSignUpInfo: React.Dispatch<React.SetStateAction<SignUpUserInfo>>;
  showPaymentModal: boolean;
  setShowPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signUpInfo, setSignUpInfo] = useState<SignUpUserInfo>({
    email: null,
    password: null,
    shopname: null,
    username: null,
    address: null,
    category: null,
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const url = 'https://api.tiendia.app/api';
  
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(url + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error)
        throw new Error(error.message);
      }

      const data = await response.json();
      console.log(data)
      setUser(data.user[0]);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    setLoading(true);
    try {
      const response = await fetch(url + '/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...signUpInfo }),
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error(error.message);
      }

      const data = await response.json();
      setUser(data.user[0]);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (
    username: string,
    shopname: string,
    address: string,
    imageBase64: string,
    businessHours?: DaySchedule[],
    paymentMethod?: 'mercadopago' | 'whatsapp',
    whatsappNumber?: string
  ) => {
    try {
      if (user) {
        const response = await fetch(url + '/auth/update', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: user.id,
            username,
            shopname,
            address,
            imageBase64,
            businessHours,
            paymentMethod,
            whatsappNumber,
          }),
          credentials: 'include',
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }

        const data = await response.json();
        setUser(data.user); // Actualizar el estado del usuario
        return true;
      }
      return false;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };

  const logout = async () => {
    // setLoading(true);
    // try {
    //   await fetch(url + '/auth/logout', {
    //     method: 'DELETE',
    //     credentials: 'include',
    //   });
    //   setUser(null);
    // } catch (error) {
    //   console.error('Logout error:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(url + '/auth/profile', {
          credentials: 'include',
        });
        console.log(response)
        const data = await response.json();
        console.log(data)
        if (data.user) {
          setUser({
            id: data.user[0].id,
            email: data.user[0].email,
            password: data.user[0].password,
            username: data.user[0].username,
            shopname: data.user[0].shopname,
            profileImageURL: data.user[0].profileImageURL,
            address: data.user[0].address,
            fcmToken: data.user[0].fcmToken,
            createdAt: data.user[0].createdAt,
            plan: data.user[0].plan,
            category: data.user[0].category,
            mp_access_token: data.user[0].mp_access_token,
            mp_refresh_token: data.user[0].mp_refresh_token,
            mp_token_expires: data.user[0].mp_token_expires,
            connected_mp: data.user[0].connected_mp,
            businessHours: data.user[0].businessHours,
            lastPaymentDate: data.user[0].lastPaymentDate,
            nextPaymentDate: data.user[0].nextPaymentDate,
            paymentMethod: data.user[0].paymentMethod, // Nuevo campo
            whatsappNumber: data.user[0].whatsappNumber, // Nuevo campo
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const checkPaymentDue = () => {
      if (user) {
        const currentDate = new Date();

        if (user.nextPaymentDate) {
          const nextPaymentDate = new Date(user.nextPaymentDate);
          if (currentDate > nextPaymentDate) {
            setShowPaymentModal(true);
          }
        } else {
          const createdAtDate = new Date(user.createdAt);
          const oneMonthAfter = new Date(createdAtDate);
          oneMonthAfter.setMonth(createdAtDate.getMonth() + 1);

          if (currentDate > oneMonthAfter) {
            setShowPaymentModal(true);
          }
        }
      }
    };

    checkPaymentDue();
    const interval = setInterval(checkPaymentDue, 3600000); // Chequear cada hora
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log('Mensaje recibido:', payload);
      if (payload.notification) {
        new Notification(payload.notification.title ?? 'Notification', {
          body: payload.notification.body ?? '',
          // icon: '/logo.png'
        });
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        updateProfile,
        logout,
        signUpInfo,
        setSignUpInfo,
        showPaymentModal,
        setShowPaymentModal,
      }}
    >
      {children}
      <PaymentModal />
    </AuthContext.Provider>
  );
}