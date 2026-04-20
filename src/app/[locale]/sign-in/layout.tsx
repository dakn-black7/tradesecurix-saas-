import { ClerkProvider } from "@clerk/nextjs";

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      {children}
    </div>
  );
}
