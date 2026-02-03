import { clerkClient } from "@clerk/nextjs/server";

import AdminPageUI from "./AdminPageUI";

const AdminPanel = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) => {
  const query = (await searchParams).search;

  const client = await clerkClient();

  const response = query
    ? (await client.users.getUserList({ query })).data
    : (await client.users.getUserList()).data;
  const users = JSON.parse(JSON.stringify(response));

  return <AdminPageUI users={users} />;
};

export default AdminPanel;
