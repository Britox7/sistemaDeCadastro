import { useState } from 'react';
import Catchphrase from '../../components/Catchphrase';
import ContainerGeral from '../../components/ContainerGeral';
import Dropdown from '../../components/DropDown';
import TableStudents from '../../components/TableStudents';
import Title from '../../components/Title';

function TelaCadastrados() {
  const [filtro, setFiltro] = useState("");

  return(
    <ContainerGeral className="flex flex-col min-h-screen">
      <Title pageTitle="Aniversariantes cadastrados"/>
      <TableStudents
        filtro={filtro}
        dropdown={<Dropdown onSelect={setFiltro} />}
      />
      <Catchphrase/>
    </ContainerGeral>
  );
}
export default TelaCadastrados;