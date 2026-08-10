/**
 * Reusable badge component for tags, categories, and priorities.
 */
interface BadgeProps {
  children: React.ReactNode;
  variant?: string;
  type?: string;
}

export default function Badge({
  children,
  variant,
  type,
}: BadgeProps) {
  return (
    <span
      className="badge"
      data-variant={variant ?? type}
    >
      {children}
    </span>
  );
}