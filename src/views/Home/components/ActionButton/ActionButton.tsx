import { IActionButton } from '../../../../types/componentType';
import './actionButton.scss';

const ActionButton = ({ icon, alt, label, action, color }: IActionButton) => {
  return (
    <button
      className='action-button'
      type='button'
      onClick={action}
      style={{ backgroundColor: color }}
    >
      <img className='icon' src={icon} alt={alt} />
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;
