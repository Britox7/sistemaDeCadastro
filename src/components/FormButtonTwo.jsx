function FormButtonTwo({ textButton, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="font-['Oswald'] text-xl bg-green-700 text-black py-2 px-4 rounded-xl hover:bg-green-600 hover:text-white"
        >
            {textButton}
        </button>
    );
}
export default FormButtonTwo;