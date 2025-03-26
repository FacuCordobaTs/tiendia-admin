import { Loader } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

export default function LoadingMP() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const code = params.get('code');
    const url =  'https://api.tiendia.app/api';

    useEffect(()=> {
        const callFunction = async ()=> { 
            const response = await fetch(url+'/payments/connect/'+ code, {
                credentials: 'include'
            });
            console.log(response)
            const data = await response.json()
            console.log(data)
        }
        callFunction();
    }, [])

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <Loader className="animate-spin h-12 w-12 text-primary" />
    </div>
  );
}
