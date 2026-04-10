export default function DashboardPage() {
  return (
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-zinc-400">Welcome back to the Team Portal.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <p className="text-zinc-500">No recent activity found.</p>
        </div>
        <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
          <h2 className="text-xl font-semibold mb-2">Upcoming Rewards</h2>
          <p className="text-zinc-500">
            Check your rewards portal for updates.
          </p>
        </div>
      </div>
    </div>
  );
}
