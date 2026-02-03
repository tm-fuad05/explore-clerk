"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const queryTerm = formData.get("search") as string;
    router.push(pathname + "?search=" + queryTerm);
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSearch} className="relative group">
        <div className="relative flex items-center">
          {/* সার্চ আইকন */}
          <Search className="w-5 h-5 absolute left-3 text-slate-400 group-focus-within:text-violet-500 transition-colors" />

          <input
            id="search"
            name="search"
            type="text"
            placeholder="Type name or email..."
            className="w-full pl-10 pr-24 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all shadow-lg"
          />

          <button
            type="submit"
            className="absolute right-2 px-4 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
