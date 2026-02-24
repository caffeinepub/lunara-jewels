import React from 'react';
import { useAdminStatus } from '../../hooks/useAdminStatus';
import UnauthorizedState from './UnauthorizedState';
import { Loader2 } from 'lucide-react';

interface AdminGateProps {
  children: React.ReactNode;
}

export default function AdminGate({ children }: AdminGateProps) {
  const { isAdmin, isLoading, isAuthenticated } = useAdminStatus();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return <UnauthorizedState isAuthenticated={isAuthenticated} />;
  }

  return <>{children}</>;
}
