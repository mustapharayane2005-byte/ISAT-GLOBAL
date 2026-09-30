import type { LucideIcon } from 'lucide-react';

/** 88px circle, 56px 1.5-stroke icon in the accent red. Used wherever a capability or sector needs a large, consistent icon mark. */
export function IconTile({ icon: Icon, className = '' }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full bg-surface ${className}`}
    >
      <Icon size={56} strokeWidth={1.5} className="text-[#D6181F]" />
    </span>
  );
}
