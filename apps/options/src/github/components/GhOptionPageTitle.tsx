type Props = {
  title: string
  children?: JSX.Element;
}

export default function GhOptionPageTitle({ title, children }: Props) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="text-gray-600 text-md">{children}</p>
    </div>
  );
}
