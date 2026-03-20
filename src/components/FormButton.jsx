function FormButton({ textButton }) {
    return (
        <button className="text-xl font-['Oswald'] bg-yellow-400 text-black py-2 px-4 rounded-xl hover:bg-yellow-500 hover:text-white">
            {textButton}
        </button>
    );
}
export default FormButton;