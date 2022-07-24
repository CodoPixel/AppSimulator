import React, {useCallback} from "react";
import './styles/AppIcon.css';

interface AppIconProps {
    icon: string;
    primaryColor: string;
    onClick: (icon:string, color:string) => void;
}

export const AppIcon: React.FC<AppIconProps> = ({
    icon,
    primaryColor,
    onClick,
}) => {
    const handleClick = useCallback(() => onClick(icon, primaryColor), [onClick, icon, primaryColor]);
    return <button className="app-icon" style={{backgroundColor:primaryColor}} onClick={handleClick}>
        <img src={icon} alt="" />
    </button>
}