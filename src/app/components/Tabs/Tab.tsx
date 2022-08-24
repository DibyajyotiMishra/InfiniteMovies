/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {useEffect, useState} from 'react';

interface Props {
  label: string;
  activeTab: string;
  onClick: (label: string) => void;
}

const Tab = ({label, onClick, activeTab}: Props) => {
  const [className, setClassName] = useState('tab-list-item');

  useEffect(() => {
    if (activeTab === label) {
      setClassName((prev: string) => (prev += ' tab-list-active'));
    } else {
      setClassName('tab-list-item');
    }
  }, [activeTab, label]);

  const onTabClick = () => {
    onClick(label);
  };

  return (
    <li className={className} onClick={onTabClick}>
      {label}
    </li>
  );
};

export default Tab;
