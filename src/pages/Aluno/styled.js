import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  input {
    height: 40px;
    width: 100%;
    max-width: 300px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 10px;
  }

  div + div {
    margin-top: 20px;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-content: center;

    & span {
      align-self: center;
    }
  }

  button {
    margin-top: 20px;
  }

  @media (max-width: 500px) {
    input,
    div {
      flex-direction: column;
      width: 100%;
      max-width: 100%;

      & span {
        align-self: initial;
      }
    }
  }
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 20px;

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: #fff;
    background: ${colors.primaryColor};
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const Title = styled.h1`
  text-align: center;
`;
