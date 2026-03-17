import InputForm from '../../components/InputForm';
import ContainerGeral from '../../components/ContainerGeral';
import Title from '../../components/Title';
import Catchphrase from '../../components/Catchphrase';

function TelaCadastro() {
   return(
        <ContainerGeral className="flex flex-col min-h-screen">
            <Title pageTitle="Cadastro de Aniversariantes" />
            <InputForm/>
            <Catchphrase/>
        </ContainerGeral>
    );
}
export default TelaCadastro;