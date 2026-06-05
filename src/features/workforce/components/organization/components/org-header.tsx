export function OrgHeader() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">
          Workforce Organization
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          Visualize your team hierarchy, reporting lines, and organizational
          structure in real-time.
        </p>
      </div>
      {/* <Link to={PATHS.WORKFORCE.ROOT}>
        <Button className="cursor-pointer">
          <Users />
          Directory
        </Button>
      </Link> */}
    </div>
  );
}
