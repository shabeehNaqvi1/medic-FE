'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Provider as ReduxProvider } from 'react-redux';
import getStore from '../store/store';
import { Toaster } from 'react-hot-toast';


function Providers({ children }: { children: React.ReactNode }) {

  const store = getStore();

  return (
    <>
    <ReduxProvider store={store}>
      <UserProvider>
        <Toaster position='top-center' />
          {children}
      </UserProvider>
    </ReduxProvider>
    </>
  );
}
export default Providers;
