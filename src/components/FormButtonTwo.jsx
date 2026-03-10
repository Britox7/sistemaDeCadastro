import { button } from "@material-tailwind/react";

function FormButtonTwo({ textButton }) {
    return (
        <button className="text-xl bg-green-700 text-white font-bold py-2 px-4 rounded-xl hover:bg-green-600 hover:text-white">
            {textButton}
        </button>
    );
}
export default FormButtonTwo;