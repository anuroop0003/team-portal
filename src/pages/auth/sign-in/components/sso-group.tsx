import { Button } from "@/components/ui/button";
import GoogleLogo from "@/assets/login/Google.svg?react";
import MicrosoftLogo from "@/assets/login/Microsoft.svg?react";
import { Field, FieldGroup } from "@/components/ui/field";

export default function SSOGroup() {
  return (
    <FieldGroup>
      <Field>
        <Button
          variant="outline"
          type="button"
          className="w-full rounded-sm cursor-pointer"
        >
          <GoogleLogo />
          Sign in with Google
        </Button>
      </Field>

      <Field>
        <Button
          variant="outline"
          type="button"
          className="w-full rounded-sm cursor-pointer"
        >
          <MicrosoftLogo />
          Sign in with Microsoft
        </Button>
      </Field>
    </FieldGroup>
  );
}
