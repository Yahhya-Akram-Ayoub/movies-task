import React, { useState } from "react";
/**
 * The theme components only imports it's theme CSS-file. These components are lazy
 * loaded, to enable "code splitting" (in order to avoid the themes being bundled together)
 */
const ThemeSelector = ({ children }) => {
  const [rtl, setRtl] = useState(false);
  const ThemeAr = React.lazy(() => import("./Theme-rtl"));
  const ThemeEn = React.lazy(() => import("./Theme"));

  return (
    <React.Suspense>
      {/* Conditionally render theme, based on the current client context */}

      {rtl ? <ThemeAr /> : <ThemeEn />}

      {children}

      {/* Render children immediately! */}
    </React.Suspense>
  );
};

export default ThemeSelector;
