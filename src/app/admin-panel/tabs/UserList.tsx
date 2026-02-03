"use client";
import { SearchUsers } from "@/app/SearchUsers";
import "@/app/globals.css";

import { User } from "@clerk/nextjs/server";
import { removeRole, setRole } from "../_actions";
import { Shield, Trash2 } from "lucide-react";

export default function UserList({ users }: { users: User[] }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
          Users Database
        </h1>
        <div className="w-full sm:w-auto">
          <SearchUsers />
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 overflow-hidden">
        {/* Horizontal Scroll Wrapper for small screens */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-150 md:min-w-full">
            <thead className="bg-slate-900 border-b border-slate-800">
              <tr>
                <th className="p-4 lg:p-5 font-bold text-slate-400 text-[10px] lg:text-xs uppercase tracking-widest">
                  User
                </th>
                <th className="p-4 lg:p-5 font-bold text-slate-400 text-[10px] lg:text-xs uppercase tracking-widest">
                  Privilege
                </th>
                <th className="p-4 lg:p-5 font-bold text-slate-400 text-[10px] lg:text-xs uppercase tracking-widest hidden sm:table-cell">
                  Registered
                </th>
                <th className="p-4 lg:p-5 font-bold text-slate-400 text-[10px] lg:text-xs uppercase tracking-widest text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  <td className="p-4 lg:p-5">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <img
                        src={user.imageUrl}
                        alt={user.firstName || "User"}
                        className="w-8 h-8 lg:w-10 lg:h-10 bg-indigo-600/20 text-indigo-400 rounded-lg lg:rounded-xl flex items-center justify-center font-black object-cover"
                      />
                      <div className="max-w-[120px] sm:max-w-none truncate">
                        <p className="font-bold text-white text-xs lg:text-sm truncate">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-[10px] lg:text-xs text-slate-500 truncate">
                          {user.emailAddresses[0].emailAddress}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 lg:p-5">
                    <span className="px-2 py-1 lg:px-3 lg:py-1 bg-slate-800 text-slate-300 rounded-lg text-[10px] lg:text-xs font-bold border border-slate-700">
                      {(user?.publicMetadata?.role as string) || "user"}
                    </span>
                  </td>
                  <td className="p-4 lg:p-5 text-[10px] lg:text-sm text-slate-400 font-medium hidden sm:table-cell">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-5">
                    <div className="grid grid-cols-2 max-sm:gap-13 justify-center">
                      <form
                        action={async (formData) => {
                          await setRole(formData);
                        }}
                      >
                        <input type="hidden" value={user.id} name="id" />
                        <input type="hidden" value="admin" name="role" />

                        <button
                          disabled={
                            user?.publicMetadata?.role === ("admin" as string)
                          }
                          type="submit"
                          className="px-3 py-1.5 text-xs font-medium text-white bg-green-700 hover:bg-green-900 rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95 disabled:bg-slate-800 disabled:text-gray-500 disabled:scale-100 disabled:border-none disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                        >
                          <Shield size={15} />
                          <span className="hidden lg:block">Make Admin </span>
                        </button>
                      </form>

                      {/* Remove Role Button (Danger Zone) */}
                      <form
                        action={async (formData) => {
                          await removeRole(formData);
                        }}
                      >
                        <input type="hidden" value={user.id} name="id" />

                        <button
                          disabled={
                            user?.publicMetadata?.role === ("user" as string)
                          }
                          type="submit"
                          className="px-3 py-1.5 text-xs font-medium text-rose-400 hover:text-white border border-rose-500/30 hover:bg-rose-600 rounded-lg transition-all active:scale-95 disabled:bg-slate-800 disabled:text-gray-500 disabled:scale-100 disabled:border-none disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                        >
                          <Trash2 size={15} />
                          <span className="hidden lg:block">Remove Role </span>
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
