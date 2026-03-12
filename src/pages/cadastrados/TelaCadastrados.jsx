import Catchphrase from '../../components/Catchphrase';
import ContainerGeral from '../../components/ContainerGeral';
import Dropdown from '../../components/DropDown';
import TabelaAlunos from '../../components/TabelaAlunos';
import Title from '../../components/Title';

function TelaCadastrados() {

   
   return(
        <ContainerGeral className="flex flex-col min-h-screen">
            <Title pageTitle="Aniversariantes cadastrados"/>
            <Dropdown/>
            <TabelaAlunos/>
            <Catchphrase/>
        </ContainerGeral>
    );
}
export default TelaCadastrados;