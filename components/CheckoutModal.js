import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';


const stripePromise = process.env.STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)
  : null;

export default function CheckoutModal({ clientSecret, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  if (!mounted) return null;

  if (!process.env.STRIPE_PUBLISHABLE_KEY) {
    return createPortal(
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="bg-white p-8 rounded-2xl max-w-md text-center">
          <h3 className="text-xl font-bold text-red-500 mb-2">Configuration manquante</h3>
          <p className="text-gray-700">La clé publique Stripe (STRIPE_PUBLISHABLE_KEY) n'est pas définie.</p>
          <button onClick={handleClose} className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Fermer</button>
        </div>
      </div>,
      document.body
    );
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] isolate">
      {/* Backdrop - Clic pour fermer */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Container de positionnement */}
      <div className="absolute inset-0 flex items-center justify-center sm:p-4 pointer-events-none">
        {/* Modal Content */}
        <div className="bg-white w-full h-full sm:h-[85vh] sm:max-w-4xl rounded-none sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl pointer-events-auto">
            {/* Header avec bouton fermer */}
            <div className="flex justify-end p-3 bg-white border-b border-gray-100 shrink-0 z-10">
                <button 
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                  aria-label="Fermer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
            </div>
            
            {/* Contenu Scrollable */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-2 sm:p-4">
                <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ clientSecret }}
                >
                <EmbeddedCheckout className="w-full" />
                </EmbeddedCheckoutProvider>
            </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
