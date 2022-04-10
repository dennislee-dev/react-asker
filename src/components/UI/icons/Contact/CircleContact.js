import React from 'react';

const CircleContact = ({className}) => (
  <svg className={className} viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="56" cy="56" r="56" fill="#AEB8FF"/>

    <g mask="url(#mask0_1858_1089)">
      <rect opacity="0.8" x="61.1162" y="22.5723" width="40.8471" height="56.6588" rx="7" transform="rotate(20 61.1162 22.5723)" fill="white"/>
      <rect opacity="0.8" width="40.8471" height="56.6588" rx="7" transform="matrix(-0.939693 0.34202 0.34202 0.939693 51.1328 22.5723)" fill="white"/>
      <g filter="url(#filter0_d_1858_1089)">
        <rect x="32.9414" y="23.7168" width="46.1176" height="64.5647" rx="7" fill="white"/>
      </g>
      <rect x="42.1641" y="32.9414" width="27.6706" height="6.58824" rx="2.5" fill="#3D56F0"/>
      <rect x="42.1641" y="59.2949" width="27.6706" height="6.58824" rx="2.5" fill="#00D9CD"/>
      <rect opacity="0.4" x="42.1641" y="69.8359" width="27.6706" height="6.58824" rx="2.5" fill="#3D56F0"/>
      <rect x="48.7529" y="43.4824" width="14.4941" height="6.58824" rx="2.5" fill="#3D56F0"/>
    </g>
    <defs>
      <filter id="filter0_d_1858_1089" x="19.9414" y="17.7168" width="72.1172" height="90.5645" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="7"/>
        <feGaussianBlur stdDeviation="6.5"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.239216 0 0 0 0 0.335551 0 0 0 0 0.941176 0 0 0 0.525158 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1858_1089"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1858_1089" result="shape"/>
      </filter>
    </defs>
  </svg>

);

export default CircleContact;
