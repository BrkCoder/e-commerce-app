import { handleAuthProfile } from "../services/Auth";
import type { User } from "../services/Users";
import { useUserStore } from "../store/userStore";

const useProfile = () => {
    const { setProfile } = useUserStore();

    const handleProfile = (id: number) => {
        return handleAuthProfile(
            id,
            (profile: User) => {
                setProfile(profile);
                return profile;
            },
            (error: Error) => {
                console.error("Error fetching user profile:", error);
                throw error;
            }
        );
    }

    return { handleProfile };

}

export default useProfile;
