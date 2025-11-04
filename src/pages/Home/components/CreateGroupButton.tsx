import { CiCirclePlus } from 'react-icons/ci';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { useNavigate } from 'react-router-dom';

const CreateGroupButton = () => {
  const navigate = useNavigate();
  return <Button onClick={() => navigate('/create-group')} />;
};

const Button = styled(CiCirclePlus)`
  position: fixed;
  bottom: 70px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${colors.primary};
  color: white;
`;

export default CreateGroupButton;
