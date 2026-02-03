import { SearchUsers } from "@/app/SearchUsers";
import { Edit, Trash2 } from "lucide-react";

import { User } from "@clerk/nextjs/server";
import { removeRole, setRole } from "../_actions";

export default function UserList({ users }: { users: User[] }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-white tracking-tight">
          Users Database
        </h1>
        <SearchUsers />
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900 border-b border-slate-800">
            <tr>
              <th className="p-5 font-bold text-slate-400 text-xs uppercase tracking-widest">
                User
              </th>
              <th className="p-5 font-bold text-slate-400 text-xs uppercase tracking-widest">
                Privilege
              </th>

              <th className="p-5 font-bold text-slate-400 text-xs uppercase tracking-widest">
                Registered
              </th>
              <th className="p-5 font-bold text-slate-400 text-xs uppercase tracking-widest text-center">
                Manage
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-slate-800/40 transition-colors group"
              >
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={user.imageUrl}
                      className="w-10 h-10 bg-indigo-600/20 text-indigo-400 rounded-xl flex items-center justify-center font-black"
                    />

                    <div>
                      <p className="font-bold text-white text-sm">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {user.emailAddresses[0].emailAddress}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-5">
                  <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold border border-slate-700">
                    {user?.publicMetadata?.role as string}
                  </span>
                </td>

                <td className="p-5 text-sm text-slate-400 font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-5">
                  <div className="flex gap-2 justify-center">
                    <form
                      action={async (formData) => {
                        await setRole(formData);
                      }}
                    >
                      <input type="hidden" value={user.id} name="id" />
                      <input type="hidden" value="admin" name="role" />
                      <button
                        type="submit"
                        className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-violet-700 rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95"
                      >
                        {user?.publicMetadata?.role === ("user" as string) &&
                          "Make Admin"}
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
                        type="submit"
                        className="px-3 py-1.5 text-xs font-medium text-rose-400 hover:text-white border border-rose-500/30 hover:bg-rose-600 rounded-lg transition-all active:scale-95"
                      >
                        Remove Role
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
  );
}
