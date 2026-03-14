import Catchphrase from '../../components/Catchphrase';
import ContainerGeral from '../../components/ContainerGeral';
import Dropdown from '../../components/DropDown';
import TableStudents from '../../components/TableStudents';
import Title from '../../components/Title';

function TelaCadastrados() {
   return(
        <ContainerGeral className="flex flex-col min-h-screen">
            <Title pageTitle="Aniversariantes cadastrados"/>
            <TableStudents dropdown={<Dropdown/>}/>
            <Catchphrase/>
        </ContainerGeral>
    );
}
export default TelaCadastrados;