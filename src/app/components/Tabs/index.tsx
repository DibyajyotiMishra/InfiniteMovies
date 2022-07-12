import React, {useState} from 'react';
import Tab from './Tab';
import './styles.scss';

interface Props {
  children: any & React.HTMLProps<HTMLButtonElement> & React.HTMLAttributes<HTMLButtonElement>;
}

const Tabs = ({children}: Props) => {
  // @ts-ignore: Object is possibly 'null' or 'undefined'.
  const [activeTab, setActiveTab] = useState<any>(children[0]?.props.label);

  const onClickTabItem = (label: string) => {
    setActiveTab(label);
  };

  return (
    <div className="tabs">
      <ol className="tab-list">
        {children.map((child: {props: {label: string}}) => {
          return (
            <Tab
              activeTab={activeTab}
              label={child.props.label}
              key={child.props.label}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className="content">
        {children instanceof Object
          ? children?.map((child: {props: {label: any; children: any}}) => {
              if (child.props.label === activeTab) {
                return child.props.children;
              }
              // eslint-disable-next-line no-undefined
              return undefined;
            })
          : null}
      </div>
    </div>
  );
};

export default Tabs;
