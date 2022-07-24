import React from "react";
import './styles/PhoneOverlay.css';

interface PhoneOverlayProps {
    background: string;
    children: React.ReactNode;
}

export const PhoneOverlay: React.FC<PhoneOverlayProps> = ({
    background,
    children
}) => {
    return <div className="phone-overlay-container">
        <img src="/assets/phone-overlay.png" className="phone-overlay-image" alt="" />
        <img src={background} className="phone-background" alt="" />
        <div className="phone-app">
            {children}
        </div>
    </div>
}