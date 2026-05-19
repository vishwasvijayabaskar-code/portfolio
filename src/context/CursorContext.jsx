import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const CursorContext = createContext(null);

export function CursorProvider({ children }) {
  const [variant, setVariant] = useState('default');
  const [label, setLabel] = useState('');

  const setCursor = useCallback((nextVariant = 'default', nextLabel = '') => {
    setVariant(nextVariant);
    setLabel(nextLabel);
  }, []);

  const value = useMemo(
    () => ({ variant, label, setCursor }),
    [variant, label, setCursor]
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursorState() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error('useCursorState must be inside CursorProvider');
  return ctx;
}

export function useCursorHandlers(variant = 'hover', label = '') {
  const { setCursor } = useCursorState();
  return {
    onMouseEnter: () => setCursor(variant, label),
    onMouseLeave: () => setCursor('default', ''),
  };
}
