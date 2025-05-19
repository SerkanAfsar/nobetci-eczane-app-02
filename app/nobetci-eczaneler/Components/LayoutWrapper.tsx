export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex-auto md:flex-3/4">{children}</div>;
}
