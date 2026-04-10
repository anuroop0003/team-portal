export default function RewardsPage() {
  const rewards = [
    { title: "Employee of the Month", points: 500, icon: "🏆" },
    { title: "Project Milestone", points: 200, icon: "🚀" },
    { title: "Learning & Dev", points: 150, icon: "📚" },
  ];

  return (
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Rewards Portal
        </h1>
        <p className="text-zinc-400 text-lg">
          Your hard work, recognized and rewarded.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <div
            key={reward.title}
            className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-8 hover:border-primary/50 transition-all cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-6xl">{reward.icon}</span>
            </div>
            <div className="flex flex-col h-full">
              <span className="text-3xl mb-4">{reward.icon}</span>
              <h3 className="text-xl font-bold mb-2">{reward.title}</h3>
              <p className="text-primary font-mono text-2xl font-bold mt-auto">
                {reward.points}{" "}
                <span className="text-xs text-zinc-500 uppercase tracking-widest">
                  Points
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
