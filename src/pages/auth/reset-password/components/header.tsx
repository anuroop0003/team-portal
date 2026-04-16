export default function ResetPasswordHeader() {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-full bg-foreground" />
        <span className="text-lg font-semibold">shadcnspace.</span>
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-semibold">Reset Password</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Please set a new password to restore access to your account
        </p>
      </div>
    </>
  );
}
