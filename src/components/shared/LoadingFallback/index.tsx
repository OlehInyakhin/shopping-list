export function LoadingFallback() {
  return (
    <div className="flex items-center justify-center text-center py-4 fixed w-full h-full bg-gray-50/40">
      <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900 m-auto"></div>
    </div>
  );
}
