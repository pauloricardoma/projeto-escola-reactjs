import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';

import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import { AlunoContainer, ProfilePicture, NovoAluno } from './styled';
import axios from '../../services/axios';

import Loading from '../../components/Loading';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    // e.curretTarget seria o link, para pegar o que vem depois dele, usa o
    // .nextSibling capturando o ícone oculto
    const exclamation = e.currentTarget.nextSibling;
    // setando o exaclamation para ser exibido, e removendo o x, esconder
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();

    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      // para tirar o aluno excluído do frontend, com uso do indes
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);

      if (status === 401) {
        toast.error('Você precisa fazer login');
      } else {
        toast.error('Ocorreu um erro ao excluir aluno');
      }

      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Alunos</h1>

      <NovoAluno to="/aluno/">Novo aluno</NovoAluno>

      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img src={aluno.Fotos[0].url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <div>
              <span>
                <Link to={`/aluno/${aluno.id}/edit`}>
                  <FaEdit size={16} />
                </Link>
              </span>

              <span className="icons">
                <Link
                  onClick={handleDeleteAsk}
                  to={`/aluno/${aluno.id}/delete`}
                >
                  <FaWindowClose size={16} />
                </Link>

                <FaExclamation
                  size={16}
                  display="none"
                  cursor="pointer"
                  // para escluir o aluno, será necessário parâmetros
                  onClick={(e) => handleDelete(e, aluno.id, index)}
                ></FaExclamation>
              </span>
            </div>
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
