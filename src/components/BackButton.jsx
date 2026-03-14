import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="mt-1 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-black bg-gray-300 hover:bg-gray-400 rounded-lg transition-colors shadow"
    >
      ← Back
    </button>
  );
}

export default BackButton;