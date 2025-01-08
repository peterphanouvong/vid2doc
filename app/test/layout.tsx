import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }
  // await getData(user.email as string, user.id as string);
  return (
    <div className="container flex-1 md:grid md:grid-cols-[200px_1fr] md:gap-12">
      {/* <DashboardSideBar /> */}
      <main className="mt-6 md:mt-0">{children}</main>
    </div>
  );
}
