import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useVerifyEmail } from "@/services/query/auth/auth.query";
import { PATHS } from "@/routes/constants/paths";
import { FieldGroup } from "@/components/ui/field";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { UserRoundX } from "lucide-react";

export function VerifyEmailContent() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { mutate, isPending, isError, isSuccess, error } = useVerifyEmail();

  const handleVerify = async () => {
    if (!token) return;
    mutate(token);
  };

  // Automatically trigger verification if token is present
  useEffect(() => {
    if (token && !isSuccess && !isError && !isPending) {
      handleVerify();
    }
  }, [token]);

  return (
    <div className="flex w-full flex-col gap-6 p-6 sm:max-w-lg">
      <div className="flex items-center gap-3">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 328 329"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-8.5"
        >
          <rect
            y="0.5"
            width="328"
            height="328"
            rx="164"
            fill="black"
            className="dark:fill-white"
          ></rect>
          <path
            d="M165.018 72.3008V132.771C165.018 152.653 148.9 168.771 129.018 168.771H70.2288"
            stroke="white"
            strokeWidth="20"
            className="dark:stroke-black"
          ></path>
          <path
            d="M166.627 265.241L166.627 204.771C166.627 184.889 182.744 168.771 202.627 168.771L261.416 168.771"
            stroke="white"
            strokeWidth="20"
            className="dark:stroke-black"
          ></path>
          <line
            x1="238.136"
            y1="98.8184"
            x2="196.76"
            y2="139.707"
            stroke="white"
            strokeWidth="20"
            className="dark:stroke-black"
          ></line>
          <line
            x1="135.688"
            y1="200.957"
            x2="94.3128"
            y2="241.845"
            stroke="white"
            strokeWidth="20"
            className="dark:stroke-black"
          ></line>
          <line
            x1="133.689"
            y1="137.524"
            x2="92.5566"
            y2="96.3914"
            stroke="white"
            strokeWidth="20"
            className="dark:stroke-black"
          ></line>
          <line
            x1="237.679"
            y1="241.803"
            x2="196.547"
            y2="200.671"
            stroke="white"
            strokeWidth="20"
            className="dark:stroke-black"
          ></line>
        </svg>
        <span className="text-xl font-semibold">shadcn/studio</span>
      </div>

      <div>
        <h2 className="mb-1.5 text-2xl font-semibold">Verify your email</h2>

        <FieldGroup className="w-full">
          <p className="text-muted-foreground leading-relaxed">
            Account activation link sent to your email address.
            <br />
            <strong className="text-foreground">johndoe@gmail.com</strong>,
            Please follow thee link inside to continue.
          </p>

          {isError && (
            <Alert className="border-destructive bg-destructive/10 text-destructive rounded-md border-0 border-l-6">
              <UserRoundX />
              <AlertTitle>{error?.message}</AlertTitle>
            </Alert>
          )}

          <FieldGroup className="gap-2!">
            <Button
              render={<Link to={PATHS.AUTH.SIGN_IN} />}
              nativeButton={false}
            >
              Skip for now
            </Button>
            <Button
              variant="ghost"
              className="group cursor-pointer text-muted-foreground text-base"
            >
              Didn't get the mail?{" "}
              <span className="group-hover:underline text-foreground">
                Resend
              </span>
            </Button>
          </FieldGroup>
        </FieldGroup>
      </div>
    </div>
  );
}
