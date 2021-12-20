// PropTypes são sempre necessários se for receber um props, como isLoading
import PropTypes from 'prop-types';

import { Container } from './styled';

export default function Loading({ isLoading }) {
  if (!isLoading) return <></>;
  return (
    <Container>
      <div></div>
      <span>Carregando...</span>
    </Container>
  );
}

// valor padrão do propTypes
Loading.defaultProps = {
  isLoading: false,
};

// como já tem um valor padrão, não é required
Loading.propTypes = {
  isLoading: PropTypes.bool,
};
