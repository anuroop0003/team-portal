export function DirectoryHeader() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">
          Workforce Directory
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          Orchestrate your global workforce, monitor performance metrics, and
          manage professional profiles.
        </p>
      </div>
      {/* <Link to={PATHS.WORKFORCE.ORGANIZATION}>
        <Button variant="outline" className="cursor-pointer">
          <Network />
          Organization
        </Button>
      </Link> */}
    </div>
  );
}
