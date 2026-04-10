export default function RewardsPage() {
  const rewards = [
    {
      title: "Employee of the Month",
      description: "Recognized for exceptional performance and leadership.",
      points: 500,
      icon: "🏆",
      color: "from-amber-950/60 to-amber-900/20 border-amber-800/40",
      iconBg: "bg-amber-900/50",
      badge: "Top Award",
      badgeColor: "bg-amber-900/60 text-amber-300",
    },
    {
      title: "Project Milestone",
      description: "Successfully delivered a critical project on time.",
      points: 200,
      icon: "🚀",
      color: "from-blue-950/60 to-blue-900/20 border-blue-800/40",
      iconBg: "bg-blue-900/50",
      badge: "Achievement",
      badgeColor: "bg-blue-900/60 text-blue-300",
    },
    {
      title: "Learning & Dev",
      description: "Completed an advanced certification or training program.",
      points: 150,
      icon: "📚",
      color: "from-emerald-950/60 to-emerald-900/20 border-emerald-800/40",
      iconBg: "bg-emerald-900/50",
      badge: "Growth",
      badgeColor: "bg-emerald-900/60 text-emerald-300",
    },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Rewards Portal
        </h1>
        <p className="text-sm text-muted-foreground">
          Your hard work, recognized and rewarded.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Points", value: "850", icon: "⭐" },
          { label: "Rewards Earned", value: "3", icon: "🎖️" },
          { label: "This Month", value: "+200", icon: "📈" },
          { label: "Team Rank", value: "#2", icon: "🏅" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border/60 bg-card px-5 py-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </span>
              <span className="text-base">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Reward cards */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Available Rewards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rewards.map((reward) => (
            <div
              key={reward.title}
              className={`group relative overflow-hidden rounded-2xl border bg-linear-to-br ${reward.color} p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer`}
            >
              {/* Background icon */}
              <div className="absolute -bottom-3 -right-3 text-7xl opacity-[0.08] group-hover:opacity-[0.14] transition-opacity select-none">
                {reward.icon}
              </div>

              <div className="flex flex-col gap-4 relative">
                {/* Icon + badge row */}
                <div className="flex items-start justify-between">
                  <span
                    className={`inline-flex size-11 items-center justify-center rounded-xl text-2xl ${reward.iconBg} shadow-sm`}
                  >
                    {reward.icon}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${reward.badgeColor}`}
                  >
                    {reward.badge}
                  </span>
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-base font-bold text-foreground mb-1">
                    {reward.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {reward.description}
                  </p>
                </div>

                {/* Points */}
                <div className="flex items-baseline gap-1.5 mt-auto pt-2 border-t border-black/5">
                  <span className="text-2xl font-extrabold text-foreground font-mono">
                    {reward.points}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    pts
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
