import { UserInfo } from "@/app/(organizer)/profile/_components/user-info";
import { currentUser } from "@/lib/auth";

const ProfilePage = async () => {
	const user = await currentUser();
	return (
		<div>
			<UserInfo label="Profile" user={user} />
		</div>
	);
};

export default ProfilePage;
