import UserSidebar from "@/components/UserSidebar";

export const metadata = {
  title: "Dashboard | PDAM",
  description: "Praktikum SMK Telkom Malang",
};
type PropsLayout = {
  children: React.ReactNode;
};
const RootLayout = ({ children }: PropsLayout) => {
  return (
    <div>
      <UserSidebar>
      {children}
      </UserSidebar>
    </div>
  );
};

export default RootLayout;
