import { button } from "@material-tailwind/react";

function FormButton({ textButton }) {
    return (
        <button className="text-xl bg-yellow-400 text-white font-bold py-2 px-4 rounded-xl hover:bg-yellow-500 hover:text-white">
            {textButton}
        </button>
    );
}
export default FormButton;