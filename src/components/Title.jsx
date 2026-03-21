import logo from "../images/logo.png";

function Title({ pageTitle }) {
  return (
    <div className="flex flex-col pt-4 mt-6 items-center text-center px-4">
      
      <h1 className="font-['Oswald'] text-2xl md:text-3xl pb-1">
        {pageTitle}
      </h1>

      <div className="flex items-center justify-center gap-2">
        <img src={logo} alt="UniAteneu" className="h-8 md:h-10" />

        <h1 className="font-['Oswald'] text-2xl md:text-3xl">
          UniATENEU
        </h1>
      </div>

    </div>
  );
}

export default Title;