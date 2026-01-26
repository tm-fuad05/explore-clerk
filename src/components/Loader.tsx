import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-blue-400 opacity-20 rounded-full"></div>
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6 relative" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Loading</h2>
        <div className="flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
