import { useEffect } from 'react';

const useScript = url => {
  useEffect(() => {
    const script = document.createElement('script');

    script.innerHTML = url();
    script.async = true;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    }
  }, [url]);
};

export default useScript;