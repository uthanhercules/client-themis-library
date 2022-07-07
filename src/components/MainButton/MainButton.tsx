import { IMainButton } from '../../types/componentType';
import './mainButton.scss';

const MainButton = ({ type, label, action }: IMainButton) => {
  if (!action) {
    return (
      <button className='main-button' type={type}>
        {label}
      </button>
    );
  }

  return (
    <button className='main-button' onClick={action} type={type}>
      {label}
    </button>
  );
};

export default MainButton;
