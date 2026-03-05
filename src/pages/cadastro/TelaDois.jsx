import { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import styles from './TelaDois.module.css';
import InputForm from '../../components/InputForm';
import ContainerGeral from '../../components/ContainerGeral';
import Title from '../../components/Title';

function TelaDois() {

    const [searchText, setSearchText] = useState('');

    return(
        <ContainerGeral>
            <Title pageTitle="Cadastro de Aniversariantes" />
            <InputForm/>
        </ContainerGeral>
    );
}

// <h2 className={styles.title}>
//                 Cadastro de Aniversariantes <br/>*logo* Uniateneu
//             </h2>

//             <InputForm/>

//             <div className={styles.message}>
//                 <h3>
//                     Aqui o ensino vai além.....
//                 </h3>    
//             </div>
// flex flex-col justify-center
export default TelaDois;