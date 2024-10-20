import { Toaster } from 'react-hot-toast';

function ToasterContext() {
  return (
    <Toaster
      position='top-center'
      gutter={12}
      containerStyle={{ margin: '8px' }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: '16px',
          maxWidth: '600px',
          padding: '16px 24px',
          backgroundColor: 'var(--white-color)',
          color: 'var(--black-color)',
        },
      }}
    />
  );
}

export default ToasterContext;
