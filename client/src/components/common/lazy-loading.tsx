import React from "react";
import withSuspense from "@/components/common/with-suspense";

// Lazy loading utility function
export default function lazyLoading(path: string) {
   path = path.replace(/^@/, '/src'); 
  const LazyComponent = React.lazy(() => import(path));
  return withSuspense(LazyComponent, <div>Loading...</div>);
}
