function ContainerGeral({ children }) {
  return (
    <div className="w-full min-h-screen bg-blue-600 flex flex-col justify-between items-center overflow-x-hidden">
      {children}
    </div>
  );
}

export default ContainerGeral;