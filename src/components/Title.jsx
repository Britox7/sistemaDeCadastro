import logo from "../images/logo.png";

function Title({ pageTitle }) {
  return (
    <div className="flex flex-col">
      
      <h1 className="font-bold text-3xl pb-1">
        {pageTitle}
      </h1>

      <div className="flex items-center justify-center gap-2 pb-5">
        <img src={logo} alt="UniAteneu" className="h-10" />

        <h1 className="font-bold text-3xl">
          UniAteneu
        </h1>
      </div>

    </div>
  );
}

export default Title;