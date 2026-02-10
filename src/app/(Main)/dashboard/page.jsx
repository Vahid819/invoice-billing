// src/app/dashboard/page.jsx
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import LogoutButton from "@/components/signout-button";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Email: {session.user.email}</p>
      <LogoutButton />
    </div>
  );
}
