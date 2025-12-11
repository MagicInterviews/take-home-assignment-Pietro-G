export const theme = {
  colors: {
    primary: {
      DEFAULT: '#2563eb',
      hover: '#1d4ed8',
      light: '#dbeafe',
    },
    border: {
      DEFAULT: '#e5e7eb',
      dark: '#000000',
      header: '#D1D5DB',
    },
    text: {
      placeholder: '#9ca3af',
      primary: '#2563eb',
    },
    background: {
      white: '#ffffff',
      light: '#f9fafb',
    },
    eventCard: {
      background: '#eff6ff',
      border: '#bfdbfe',
    },
    registered: {
      background: '#D1FAE5',
      text: '#047857',
      border: '#D1FAE5',
    },
    icon: {
      gray: '#6b7280',
    },
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
  spacing: {
    input: {
      paddingX: '1rem',
      paddingY: '0.75rem',
    },
  },
  sizes: {
    input: {
      height: {
        sm: '2.75rem',
        md: '3rem',
      },
    },
    button: {
      height: {
        sm: '2.75rem',
        md: '3rem',
      },
      register: {
        width: '96px',
        height: '31px',
        borderRadius: '67px',
        paddingX: '16px',
        paddingY: '6px',
      },
    },
  },
  typography: {
    eventCard: {
      title: {
        fontFamily: 'Inter',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '100%',
        letterSpacing: '0%',
      },
    },
  },
  shadows: {
    card: {
      expanded: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  responsive: {
    containers: {
      narrow: 'w-full max-w-sm sm:max-w-md mx-auto px-4 sm:px-6',
      medium: 'w-full max-w-2xl sm:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
      wide: 'w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
      full: 'w-full px-4 sm:px-6 lg:px-8',
    },
    padding: {
      small: 'p-4 sm:p-6',
      medium: 'p-4 sm:p-6 lg:p-8',
      large: 'p-6 sm:p-8 lg:p-12',
    },
    spacing: {
      small: 'space-y-2 sm:space-y-4',
      medium: 'space-y-4 sm:space-y-6',
      large: 'space-y-6 sm:space-y-8 lg:space-y-10',
    },
    text: {
      xs: 'text-xs sm:text-sm',
      sm: 'text-sm sm:text-base',
      base: 'text-base sm:text-lg',
      lg: 'text-lg sm:text-xl',
      xl: 'text-xl sm:text-2xl',
      '2xl': 'text-2xl sm:text-3xl lg:text-4xl',
      '3xl': 'text-3xl sm:text-4xl lg:text-5xl',
    },
    flex: {
      colToRow: 'flex-col sm:flex-row',
      rowToCol: 'flex-row sm:flex-col',
    },
    grid: {
      '1to2': 'grid grid-cols-1 sm:grid-cols-2',
      '1to3': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      '1to4': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    },
  },
} as const;
