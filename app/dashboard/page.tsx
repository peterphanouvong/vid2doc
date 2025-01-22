import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { getUser, getBooleanFlag } = getKindeServerSession();
  const user = await getUser();
  const test = await getBooleanFlag("test", false);

  if (!user) {
    redirect("/api/auth/login");
  }

  return <div>test: {test?.toString()}</div>;
}
