export default function ForgotPasswordHeader() {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-full bg-foreground" />
        <span className="text-lg font-semibold">shadcnspace.</span>
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-semibold">Forgot your password</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Please enter the email address associated with your account and we
          will email you a link to reset your password.
        </p>
      </div>
    </>
  );
}
