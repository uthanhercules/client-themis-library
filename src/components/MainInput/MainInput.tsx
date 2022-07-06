import { IMainInput } from '../../types/componentType';
import './mainInput.scss';

const MainInput = ({ action, placeholder, type, value }: IMainInput) => {
  return (
    <input
      className='main-input'
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => action(e.target.value)}
    />
  );
};

export default MainInput;
