import { useSession } from "next-auth/react";

const ProfileName = () => {
  const { data: session, status } = useSession();
  return status == "authenticated" && session.user ? (
    <div className="w-auto">
      <div className="w-full text-lg font-medium">
        {session.user.USER_PREFIX}
        {session.user.USER_NAME + " " + session.user.USER_SURNAME}
      </div>
      <div className="flex text-base w-full">
        <div className="mr-2">ID: {session.user.HR_ID}</div>
        <div className="mr-2">Role: {session.user.ROLE}</div>
      </div>
    </div>
  ) : (
    <div className="w-auto">ผู้ใช้งานทั่วไป</div>
  );
};
export default ProfileName;
