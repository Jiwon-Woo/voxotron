import { React } from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <div className="navigation-bar">
      <Link to={'/create'}>
        <button>Poll 생성</button>
      </Link>
      <Link to={'/poll'}>
        <button>Poll 확인</button>
      </Link>
    </div>
  );
};

export default NavigationBar;
