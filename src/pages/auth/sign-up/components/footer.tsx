import { FieldDescription } from "@/components/ui/field";

export default function Footer() {
  return (
    <FieldDescription className="text-center text-xs">
      By clicking continue, you agree to our{" "}
      <a href="#" className="underline">
        Terms of Service
      </a>{" "}
      and{" "}
      <a href="#" className="underline">
        Privacy Policy
      </a>
      .
    </FieldDescription>
  );
}
