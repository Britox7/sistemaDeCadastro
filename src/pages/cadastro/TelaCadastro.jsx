import { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import InputForm from '../../components/InputForm';
import ContainerGeral from '../../components/ContainerGeral';
import Title from '../../components/Title';
import Catchphrase from '../../components/Catchphrase';

function TelaCadastro() {

    const [searchText, setSearchText] = useState('');

   return(
        <ContainerGeral className="flex flex-col min-h-screen">
            <Title pageTitle="Cadastro de Aniversariantes" />
            <InputForm/>
            <Catchphrase/>
        </ContainerGeral>
    );
}
export default TelaCadastro;