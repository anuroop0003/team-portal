export default function Header() {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white" />
        <span className="text-lg font-semibold">shadcnspace.</span>
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-semibold">Login to Shadcnspace</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Sign up for free
          </a>
        </p>
      </div>
    </>
  );
}
