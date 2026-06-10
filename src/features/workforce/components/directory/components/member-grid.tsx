import { MemberCard, MemberCardSkeleton } from "./member-card";
import { type Member } from "@/features/workforce/types/workforce";

interface MemberGridProps {
  members: Member[];
  isLoading?: boolean;
}

export function MemberGrid({ members, isLoading = false }: MemberGridProps) {
  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-300">
        {Array.from({ length: 6 }).map((_, index) => (
          <MemberCardSkeleton key={index} />
        ))}
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-300">
      {members.map((member) => (
        <MemberCard key={member.id} isLoading={isLoading} member={member} />
      ))}
    </div>
  );
}
