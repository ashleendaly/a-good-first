import { currentUser } from "@clerk/nextjs";

const Profile = async () => {
  const user = await currentUser();
  if (user) {
    const { firstName } = user;
    return <div>Hello {firstName}!</div>;
  }

  return <div>Hello!</div>;
};

export default Profile;
