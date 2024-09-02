export default function BlinkLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="flex flex-col w-full min-h-[80vh]">
        <h1 className="text-3xl font-black text-center mb-4">Wallet</h1>
        <div className="flex-grow flex">
        {children}
        </div>
      </div>
    );
  }
  