import {
  useSendVerification,
  useVerifyEmail,
  useVerifyTokenInfoQuery,
} from "@/services/query/auth/auth.query";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";
import { VerifyLayout } from "./verify-layout";
import { SuccessView } from "./success-view";
import { ExpiredSessionView } from "./expired-session-view";
import { VerificationFlow } from "./verification-flow";
import { ErrorView } from "./error-view";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";

const RESEND_DELAY = 30;

export function VerifyEmailContent() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [email, setEmail] = useState<string>(
    () => sessionStorage.getItem("verification_email") || "",
  );
  const [timer, setTimer] = useState<number>(() =>
    !token && email ? RESEND_DELAY : 0,
  );

  const { data: tokenInfo, isLoading: isLoadingTokenInfo } =
    useVerifyTokenInfoQuery(token);

  const { mutate: resend, isPending: isResending } = useSendVerification();
  const {
    mutate: verify,
    isPending: isVerifying,
    isSuccess,
    isError,
    error,
  } = useVerifyEmail();

  /* ---------------- TOKEN INFO SYNC ---------------- */
  useEffect(() => {
    if (tokenInfo?.email) {
      setEmail(tokenInfo.email);
    }
  }, [tokenInfo]);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => {
      setTimer((t) => (t <= 1 ? 0 : t - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [timer]);

  /* ---------------- HANDLERS ---------------- */
  const handleVerify = () => {
    if (!token) return;
    verify(token, {
      onSuccess: () => {
        toast.success("Email verified successfully!");
        sessionStorage.removeItem("verification_email");
      },
      onError: (error) => toast.error(error.message || "Verification failed."),
    });
  };

  const handleResend = () => {
    if (!email) return toast.error("Email not found.");
    resend(
      { email },
      {
        onSuccess: (response) => {
          if (response.link) {
            console.log("VERIFICATION LINK:", response.link);
          }
          toast.success("Verification email sent!");
          setTimer(RESEND_DELAY);
        },
        onError: (error) =>
          toast.error(error.message || "Failed to resend email."),
      },
    );
  };

  /* ---------------- STATE DECODING ---------------- */
  if (isSuccess) {
    return (
      <VerifyLayout>
        <SuccessView onSignIn={() => navigate(PATHS.AUTH.SIGN_IN)} />
      </VerifyLayout>
    );
  }

  if (!token && !email) {
    return (
      <VerifyLayout>
        <ExpiredSessionView
          onReturn={() => navigate(PATHS.AUTH.REGISTER_ORGANIZATION)}
        />
      </VerifyLayout>
    );
  }

  if (isLoadingTokenInfo) {
    return (
      <VerifyLayout>
        <div className="space-y-1.5">
          <h2 className="text-2xl font-semibold">Securing your account</h2>
          <FieldGroup>
            <p className="text-muted-foreground">
              We're validating your unique verification link to ensure a secure
              setup. This will only take a moment.
            </p>
            <Button disabled className="w-full">
              <Loader className="animate-spin" />
              Authenticating...
            </Button>
          </FieldGroup>
        </div>
      </VerifyLayout>
    );
  }

  if (isError) {
    return (
      <VerifyLayout>
        <ErrorView
          email={email}
          error={error.message}
          timer={timer}
          isResending={isResending}
          onResend={handleResend}
          onSignIn={() => navigate(PATHS.AUTH.SIGN_IN)}
        />
      </VerifyLayout>
    );
  }

  return (
    <VerifyLayout>
      <VerificationFlow
        email={email}
        token={token}
        timer={timer}
        isVerifying={isVerifying}
        isResending={isResending}
        onVerify={handleVerify}
        onResend={handleResend}
        onSignIn={() => navigate(PATHS.AUTH.SIGN_IN)}
      />
    </VerifyLayout>
  );
}
