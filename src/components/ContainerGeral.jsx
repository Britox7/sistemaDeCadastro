function ContainerGeral({ children }) {
  return (
    <div className="w-screen min-h-screen bg-blue-600 flex flex-col justify-center items-center">
      {children}
    </div>
  );
}

export default ContainerGeral;