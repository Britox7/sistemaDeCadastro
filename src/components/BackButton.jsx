import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="mt-1 inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-black bg-gray-300 hover:bg-gray-400 rounded-lg transition-colors shadow border"
    >
      <HiArrowLeft className="text-lg" />
    </button>
  );
}

export default BackButton;