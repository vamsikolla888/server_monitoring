import React, { Suspense } from "react";

// withSuspense HOC to wrap a component in Suspense
export default function withSuspense(
  Component: React.LazyExoticComponent<React.ComponentType<any>>, // Lazy-loaded component
  fallback: React.ReactNode // Fallback UI
): React.FC {
  return function Wrapper() {
    return (
      <Suspense fallback={fallback}>
        <Component />
      </Suspense>
    );
  };
}
