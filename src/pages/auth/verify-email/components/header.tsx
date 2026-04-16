interface Props {
  isVerifying?: boolean;
}

export default function VerifyEmailHeader({ isVerifying }: Props) {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-full bg-foreground" />
        <span className="text-lg font-semibold">shadcnspace.</span>
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-semibold">Verify your email</h2>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          {isVerifying ? (
            "Your verification link is ready. Please click the button below to complete the activation process and secure your account."
          ) : (
            <>
              An activation link has been sent to your email address:
              hello@example.com. Please check your inbox and click on the link
              to complete the activation process.
            </>
          )}
        </p>
      </div>
    </>
  );
}
