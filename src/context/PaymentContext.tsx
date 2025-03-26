import { createContext, useContext,  ReactNode } from "react";

import {MercadoPagoConfig, OAuth} from "mercadopago";


export const mercadopago = new MercadoPagoConfig({accessToken: 'APP_USR-6137280226622490-022016-ecdb896b75fb26d4bfbfe2b8bcf46545-1466331247'});

interface AuthContextType {
    authorize: ()=>Promise<any>;
    createSubscriptionPreference: (planId: string)=>Promise<any>;
};

const PaymentContext = createContext<AuthContextType | undefined>(undefined);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) throw new Error("There is no Payment provider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
};

export default function PaymentProvider({ children }: AuthProviderProps) {
  const url =  'https://api.tiendia.app/api';

  const createSubscriptionPreference = async (planId: string) => {
    try {
      const response = await fetch(url+'/payments/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ planId })
      });
      const data = await response.json()
      // const { checkoutUrl } = await response.json();
      return data.preference.init_point;
    } catch (error) {
      console.error('Subscription error:', error);
      throw error;
    }
  }

    const authorize = async ()=> {
        const url = new OAuth(mercadopago).getAuthorizationURL({
        options: {
            client_id: '6137280226622490',
            redirect_uri: ('http://localhost:5173/loadingmp'),
        },
        });
        
        return url;
    }

  return ( 
    <PaymentContext.Provider 
    value={{ 
        authorize,
        createSubscriptionPreference
    }}>
      {children}
    </PaymentContext.Provider>
  );
}