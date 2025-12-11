"use client";

import { Toaster as HotToaster } from "react-hot-toast";
import { Check } from "lucide-react";

export function Toaster() {
  return (
    <HotToaster
      position="top-center"
      toastOptions={{
        success: {
          duration: 3000,
          icon: (
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: '2px solid #047857',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Check className="w-3 h-3" style={{ color: '#047857' }} />
            </div>
          ),
          style: {
            background: '#D1FAE5',
            color: '#047857',
            borderRadius: '6px',
            padding: '8px 10px',
            boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
            minWidth: '128px',
            minHeight: '40px',
            fontSize: '14px',
            fontWeight: 500,
            border: '1px solid #D1FAE5',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          },
        },
      }}
    />
  );
}
