"use client";

import { FormEvent, useState } from "react";
import { verifyAdminPassword } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const result = await verifyAdminPassword(password);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setUnlocked(true);
    } finally {
      setPending(false);
    }
  }

  if (!unlocked) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <div className="w-full max-w-sm rounded-lg border bg-card p-6 shadow-lg space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Admin access</h2>
            <p className="text-sm text-muted-foreground">
              Enter the admin password to continue.
            </p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                autoFocus
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Checking…" : "Continue"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
