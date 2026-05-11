import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="flex flex-1 items-center justify-center px-space-4 py-space-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md text-center">

        <h1 className="text-2xl font-semibold mb-4">
          Profile
        </h1>

        <p className="text-gray-600 mb-2">
          <strong>Username:</strong> {username || "Guest"}
        </p>

        <Button className="mt-4 w-full" onClick={handleLogout}>
          Logout
        </Button>

      </div>
    </div>
  );
};

export default Profile;