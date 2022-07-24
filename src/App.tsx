import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {PhoneOverlay} from "./components/PhoneOverlay";
import {AppIcon} from "./components/AppIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCircle,
    faCog,
    faLock,
    faPlane,
    faPlay,
    faSquare,
    faVolumeXmark,
    faWifi,
    faFireFlameSimple,
    faBatteryFull
} from "@fortawesome/free-solid-svg-icons";
import {faBluetoothB} from "@fortawesome/free-brands-svg-icons";

interface Application {
    icon: string;
    color: string;
    open: boolean;
}

interface Options {
    wifi: boolean;
    volume: boolean;
    bluetooth: boolean;
    lock: boolean;
    plane: boolean;
    lamp: boolean;
}

type RGB = [number, number, number];

function initOptions(): Options {
    return {
        wifi: true,
        volume: true,
        bluetooth: false,
        lock: false,
        plane: false,
        lamp: false,
    }
}

function hex2rgb(hex: string): RGB {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [ r, g, b ];
}

function whitenRgb(rgb: RGB): RGB {
    const f = 120;
    const r = rgb[0] + f;
    const g = rgb[1] + f;
    const b = rgb[2] + f;
    return [r > 255 ? 255 : r, g > 255 ? 255 : g, b > 255 ? 255 : b];
}

function rgbToString(rgb: RGB, alpha?: number): string {
    if (alpha !== undefined) {
        return `rgba(${rgb.join(', ')}, ${alpha})`;
    }
    return `rgb(${rgb.join(', ')})`;
}

function App() {
    const [date, setDate] = useState<Date>();
    const [currentApp, setCurrentApp] = useState<Application>();
    const [isTopMenuOpen, setIsTopMenuOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<Options>(initOptions);

    useEffect(() => {
        window.setInterval(() => setDate(new Date()), 1000);
    }, []);

    const showTopMenu = useCallback(() => setIsTopMenuOpen(true), []);
    const removeTopMenu = useCallback(() => setIsTopMenuOpen(false), []);
    const goToMenu = useCallback(() => {setIsTopMenuOpen(false); setCurrentApp(v => ({...v!, open: false}));}, []);
    const goBack = useCallback(() => { if (isTopMenuOpen) { setIsTopMenuOpen(false) } else { setCurrentApp(v => ({...v!, open: false})); } }, [isTopMenuOpen]);
    const launchApp = useCallback((icon:string, color:string) => setCurrentApp({icon, color, open: true}), []);
    const toggleWifi = useCallback(() => setOptions(v => ({...v, wifi:!v.wifi})), []);
    const toggleVolume = useCallback(() => setOptions(v => ({...v, volume:!v.volume})), []);
    const toggleBluetooth = useCallback(() => setOptions(v => ({...v, bluetooth:!v.bluetooth})), []);
    const toggleLock = useCallback(() => setOptions(v => ({...v, lock:!v.lock})), []);
    const togglePlane = useCallback(() => setOptions(v => ({...v, plane:!v.plane})), []);
    const toggleLamp = useCallback(() => setOptions(v => ({...v, lamp:!v.lamp})), []);

    return <PhoneOverlay background="/assets/default-background.jpeg">
        <div className={"top-menu" + (isTopMenuOpen ? ' top-menu-open' : ' top-menu-close')} style={currentApp?.open ? {backgroundColor: rgbToString(whitenRgb(hex2rgb(currentApp.color)), 0.9)} : undefined}>
            <div className="top-menu-header">
                <h3>{date?.toDateString()}</h3>
                <button><FontAwesomeIcon icon={faCog} /></button>
            </div>
            <div className="top-menu-options-container">
                <button className={"phone-option " + (options.wifi ? ' phone-option-active' : '')} onClick={toggleWifi}><FontAwesomeIcon icon={faWifi} /></button>
                <button className={"phone-option " + (options.volume ? ' phone-option-active' : '')} onClick={toggleVolume}><FontAwesomeIcon icon={faVolumeXmark} /></button>
                <button className={"phone-option " + (options.bluetooth ? ' phone-option-active' : '')} onClick={toggleBluetooth}><FontAwesomeIcon icon={faBluetoothB} /></button>
                <button className={"phone-option " + (options.lock ? ' phone-option-active' : '')} onClick={toggleLock}><FontAwesomeIcon icon={faLock} /></button>
                <button className={"phone-option " + (options.plane ? ' phone-option-active' : '')} onClick={togglePlane}><FontAwesomeIcon icon={faPlane} /></button>
                <button className={"phone-option " + (options.lamp ? ' phone-option-active' : '')} onClick={toggleLamp}><FontAwesomeIcon icon={faFireFlameSimple} /></button>
            </div>
            <p className="no-notif">Aucune notification</p>
            <div className="remove-menu-zone" onClick={removeTopMenu} />
        </div>
        <div className={"launched-app" + (currentApp?.open ? '' : ' no-app')} style={currentApp ? {backgroundColor:currentApp.color} : undefined}>
            {currentApp?.open ? <img src={currentApp.icon} alt="" /> : null }
        </div>
        <div className="phone-top-bar" onClick={showTopMenu}>
            <span className={isTopMenuOpen ? 'black-top-icon' : ''}><FontAwesomeIcon icon={faWifi} /></span>
            <span className={isTopMenuOpen ? 'black-top-icon' : ''}><FontAwesomeIcon icon={faBatteryFull} /></span>
        </div>
        <div className="widget-weather">
            <div className="time">
                <h2>{date ? date.toLocaleTimeString().substring(0, date.toLocaleDateString().length - 5) : ""}</h2>
                <span>{date?.toDateString()}</span>
            </div>
            <div className="weather">
                <img src="/assets/sunny-day.svg" alt="Sunny day" />
                <span>Sunny 25°C</span>
            </div>
        </div>
        <div className="app-grid">
            <AppIcon icon="/assets/brands/ilevia-icon.jpeg" primaryColor="#F70000" onClick={launchApp} />
            <AppIcon icon="/assets/brands/whatsapp.svg" primaryColor="#1CD741" onClick={launchApp} />
        </div>
        <div className="bottom-bar">
            <button><FontAwesomeIcon icon={faSquare} /></button>
            <button onClick={goToMenu}><FontAwesomeIcon icon={faCircle} /></button>
            <button onClick={goBack}><FontAwesomeIcon icon={faPlay} className="return-button" /></button>
        </div>
    </PhoneOverlay>
}

export default App;
