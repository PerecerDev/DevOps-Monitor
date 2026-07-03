import { Activity } from 'lucide-react';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from '@/shared/components/ui';
import { MOCK_CREDENTIALS } from '@/shared/mocks/data';

import { useLoginForm } from '../hooks/useAuth';

export function LoginPage() {
  const { form, onSubmit, mutation } = useLoginForm();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="flex min-h-dvh">
      <div className="hidden flex-1 flex-col justify-between bg-sidebar p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-accent">
            <Activity className="size-5 text-accent-foreground" aria-hidden="true" />
          </div>
          <span className="text-lg font-semibold">DevOps Monitor</span>
        </div>
        <div className="max-w-md">
          <h1 className="text-3xl font-semibold tracking-tight">
            Monitor your infrastructure with confidence
          </h1>
          <p className="mt-4 text-muted">
            Track deployments, pipelines, builds, and alerts in one unified platform built for
            engineering teams.
          </p>
        </div>
        <p className="text-xs text-muted">© 2026 DevOps Monitor. All rights reserved.</p>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Enter your credentials to access the monitoring dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(event) => {
                void onSubmit(event);
              }}
              className="space-y-4"
              noValidate
            >
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  error={Boolean(errors.email)}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-xs text-destructive" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  error={Boolean(errors.password)}
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-xs text-destructive" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {mutation.isError && (
                <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
                  {mutation.error.message}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={mutation.isPending}>
                {mutation.isPending ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className="mt-6 rounded-md border border-border bg-surface-elevated p-3">
              <p className="text-xs font-medium text-muted">Demo credentials</p>
              <p className="mt-1 font-mono text-xs">
                {MOCK_CREDENTIALS.email} / {MOCK_CREDENTIALS.password}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
