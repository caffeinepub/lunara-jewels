import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from '@tanstack/react-router';
import LoginButton from '../auth/LoginButton';

interface UnauthorizedStateProps {
  isAuthenticated: boolean;
}

export default function UnauthorizedState({ isAuthenticated }: UnauthorizedStateProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6 max-w-md px-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-6">
            <ShieldAlert className="h-12 w-12 text-destructive" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-serif font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            {isAuthenticated
              ? 'You do not have administrator privileges to access this area.'
              : 'Please log in with an administrator account to access this area.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {!isAuthenticated && <LoginButton />}
          <Button variant="outline" onClick={() => navigate({ to: '/' })}>
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
