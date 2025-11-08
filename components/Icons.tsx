import React from 'react';

interface IconProps {
  className?: string;
}

export const TrashIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}>
        <path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9L12 18l1.9-5.8 5.8-1.9-5.8-1.9L12 3z"/>
        <path d="M5 3v4"/>
        <path d="M19 17v4"/>
        <path d="M3 5h4"/>
        <path d="M17 19h4"/>
    </svg>
);


export const RunningIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className}>
        <g data-name="21_running">
            <path fill="#ddd3d4" d="M121.57 408.65h25.54v12h-25.54zM63.95 336.94h20.77v12H63.95zM123.95 298.88h20.77v12h-20.77zM100.56 336.94h72.3v12h-72.3zM31.06 298.88h72.31v12H31.06z"/>
            <path d="m316.19 261.19 20.32-40.32 104.18-117.8-70.35-52.91A10.75 10.75 0 0 0 355 52.69l-75.85 111.07-22.9 10.54-1.85-4.38a10.1 10.1 0 0 0-13.26-5.35l-72 30.76a41.25 41.25 0 0 0-22.08 53.26L210 408.65h-51.34v12h62l36.47 34.57c6.4 6.17 19.37 8.41 28.25 8.41h40.72V434.9a33.79 33.79 0 0 0-23.36-32.15l-16.08-53.09 29.39-88.73c.05.07.1.17.14.26z" fill="#dcd3d4"/>
            <path d="m397.12 45.75-89.59 131.17-17.11 7.75s3.3 9.32-10.79 18.44-2.72 47.79 19.06 45.75 42.67-7 53.26 14.68l20.32-40.32 104.18-117.8z" fill="#f3b5af"/>
            <path d="M327.92 414.88a33.8 33.8 0 0 1 33.8 33.8v7a6.57 6.57 0 0 1-6.57 6.57h-39.71a34.32 34.32 0 0 1-23.82-9.61l-53.24-51.3L174.14 241a17.73 17.73 0 0 1 9.49-22.9l93.13-39.78a10.09 10.09 0 0 1 13.24 5.39l1.93 4.58a2.42 2.42 0 0 1-1.24 3.15 29.72 29.72 0 0 0-15.42 38.14 29.71 29.71 0 0 0 34.81 17.8l5.83-1.46a29.09 29.09 0 0 1 34.74 19.22l2.07 6.36-30.46 91.95 16.58 54.76" fill="#f2463e"/>
            <path d="M294.19 188.14a2.42 2.42 0 0 1-1.24 3.15 29.7 29.7 0 0 0-15.9 17.33c-9.66 11.16-28.59 36.59-20.29 89.5 10.53 67.1-7.16 75.76-22 89.49l-58.39-146.72a17.73 17.73 0 0 1 9.49-22.9L279 178.2a10.09 10.09 0 0 1 13.25 5.35z" fill="#dc4038"/>
            <path d="M363.58 442.48h-41.15a22.1 22.1 0 0 1-16.54-7.48l-20.49-23.1a41.33 41.33 0 0 0-37.95-12l-6.65 1.32 55.57 54.83a32.8 32.8 0 0 0 23 9.45h44.17z" fill="#dcd3d4"/>
            <path d="m206.2 210.88 31 77.67s7 21.34-21.18 48.92l-39.47-95.09c-3.71-9.41 2.95-20.47 12.38-24.13z" fill="#fff"/>
            <path d="M228.55 321.92a91.6 91.6 0 0 1-12.94 15.55l-39.47-95.09c-3.13-7.93 2.86-18 9.91-22.9z" fill="#dcd3d4"/>
            <path transform="rotate(-79.72 286.782 341.628)" fill="#fff" d="M278.71 335.62h16.13v12h-16.13z"/>
            <path transform="rotate(-79.72 294.32 300.002)" fill="#fff" d="M269.82 294h49v12h-49z"/>
            <path fill="#142546" d="M426 457.63h23.97v12H426zM42.55 457.63h35v12h-35zM370.14 457.06v-7a39.86 39.86 0 0 0-24.48-36.73L331 364.87l12.82-38.68c4.48 5.9 12 11.35 23.92 14.52l3.07-11.6c-16.64-4.41-20.19-13.2-20.8-18.25h.52a24.75 24.75 0 0 0 8.49-48l18.27-36.26 103.65-117.21-9-8-104.68 118.44-16.06 31.87a35.21 35.21 0 0 0-34.31-10.26l-5.82 1.46a23.72 23.72 0 0 1-15.48-44.65 8.48 8.48 0 0 0 4.81-9.31l11.43-7.69 90.24-132.12-9.91-6.76-88.93 130.21-8.23 5.53a16.09 16.09 0 0 0-18.17-3.93L183.69 214A23.87 23.87 0 0 0 171 244.61l64.72 161.53 53.43 51.49H94.55v12h316.66v-12h-41.1c.01-.19.03-.38.03-.57zm-17.21-158.41 7-21.14a12.76 12.76 0 0 1-7 21.14zm-130.17 42.91 12.74-19.62a47.53 47.53 0 0 0 4.33-43.3c-3.68-9.31-8.62-21.69-14.68-36.79L214 246.33c6.05 15.07 11 27.43 14.66 36.72a35.54 35.54 0 0 1-3.23 32.35l-8.14 12.54-35.17-87.79a11.79 11.79 0 0 1 6.29-15.15l14.52-6.2 7.66 19 11.13-4.48c-3.19-7.92-5.95-14.78-7.76-19.25l67.58-28.87a4.09 4.09 0 0 1 5.37 2.17l.64 1.52A35.72 35.72 0 0 0 314 254.54l5.83-1.46a23.16 23.16 0 0 1 27.57 15.25l1.46 4.49-5.27 15.93h-13.14v12h9.14l-2.47 7.47h-12.07v12h8.09l-2.47 7.47h-11.85v12h7.87l-2.47 7.46h-9.9v12h5.92l-1.84 5.56 13.8 45.56h-5.4l-22.19-40 21.93-100.66-11.73-2.61-22.89 105 21.16 38.19h-5.55v12h22.81a27.85 27.85 0 0 1 25 15.7h-32.91a16.1 16.1 0 0 1-12.05-5.42l-20.49-23.11-.16-.16a47.11 47.11 0 0 0-43.45-13.72l-1.77.35zm95.1 116.07a28.18 28.18 0 0 1-19.66-7.93l-44.66-43A35.17 35.17 0 0 1 281 417.44l20.41 23a28.1 28.1 0 0 0 21 9.46h35.71v7.14a.57.57 0 0 1-.57.57z"/>
            <path fill="#142546" d="M127.51 398.45h25.54v12h-25.54zM164.6 398.45h57.37v12H164.6zM69.89 326.73h20.77v12H69.89zM129.89 288.67h20.77v12h-20.77zM106.49 326.73h78.63v12h-78.63zM36.99 288.67h72.31v12H36.99z"/>
        </g>
    </svg>
);

export const XIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export const FocusTreeIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" className={className}>
        <path fill="#b1cc33" d="M51.56 17.73c-.509.003-1.018.034-1.524.091l-.673.072l-.317-.6c-2.673-5.047-8.5-8.308-14.854-8.308c-9.026 0-16.369 6.4-16.369 14.268c.002.517.035 1.032.1 1.544l.1.824l-.792.251c-4.015 1.272-6.608 4.186-6.608 7.421c0 4.445 4.851 8.061 10.813 8.061a13.17 13.17 0 0 0 6.584-1.688l.591-.34l.19.15l.343.275c2.714 2.167 7.082 3.462 11.683 3.462c7.763 0 14.32-3.69 14.32-8.06a4.411 4.411 0 0 0-.077-.806l-.139-.75l-.021-.118l.842-.266c4.021-1.27 6.621-4.185 6.621-7.425c.002-4.439-4.85-8.058-10.813-8.058z"/>
        <path fill="#5c9e31" d="M39.468 27.997s4.917 7.331 15.443 5.488l.891 3.572l-4 4.922l-9.214 2.032l-12.13-2.555l-1.846-2.126A17.56 17.56 0 0 0 39.47 27.997z"/>
        <g fill="none" stroke="#000" strokeLinecap="round" strokeWidth="2">
            <path strokeLinejoin="round" d="M35.789 63.943V52.776l-7.63-7.516m7.63 7.516l4.368-4.546"/>
            <path strokeMiterlimit="10" d="M63.374 25.773c0-5-5.289-9.06-11.813-9.06a15.38 15.38 0 0 0-1.63.1c-2.764-5.217-8.763-8.84-15.739-8.84c-9.593 0-17.369 6.836-17.369 15.268c.002.558.038 1.114.108 1.667c-4.288 1.36-7.306 4.595-7.306 8.374c0 5 5.29 9.061 11.813 9.061c2.48.021 4.922-.607 7.084-1.822c2.791 2.23 7.257 3.681 12.307 3.681c8.461 0 15.32-4.057 15.32-9.06a5.464 5.464 0 0 0-.094-.987c4.294-1.36 7.32-4.598 7.32-8.382z"/>
        </g>
    </svg>
);

export const BrainIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" className={className}>
        <path fill="#ffa7c0" d="M52.482 29.62c-1.251 1.808-.075 3.386 1.104 5.186c1.223 1.868.563 4.303-1.262 5.916a1.353 1.353 0 0 0-.367 1.95c1.242 2.624.357 5.163-2.12 6.738a2.974 2.974 0 0 0-1.117 1.377a4.917 4.917 0 0 1-5.273 3.447a1.902 1.902 0 0 0-1.392.702c-1.422 1.967-3.278 2.355-5.31.918a1.115 1.115 0 0 0-1.553.008c-1.96 1.417-3.89 1.007-5.323-.942a1.925 1.925 0 0 0-1.408-.694a4.72 4.72 0 0 1-5.15-3.371a2.973 2.973 0 0 0-1.12-1.404c-2.651-1.652-3.51-4.269-2.082-7.063c.404-.79.174-1.099-.371-1.576a4.98 4.98 0 0 1-.162-7.77a1.32 1.32 0 0 0 .373-1.753c-1.134-2.796-.305-5.051 2.242-6.69a3.162 3.162 0 0 0 1.147-1.532a4.591 4.591 0 0 1 4.98-3.201a1.446 1.446 0 0 0 1.664-.79a3.38 3.38 0 0 1 5.09-.991a1.227 1.227 0 0 0 1.765.012c1.877-1.348 3.824-.89 5.212.99a2.048 2.048 0 0 0 1.505.73a4.864 4.864 0 0 1 5.183 3.558a3.24 3.24 0 0 0 1.283 1.416a5.234 5.234 0 0 1 2.462 4.828z"/>
        <path fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2" d="M52.482 29.62c-1.251 1.808-.075 3.386 1.104 5.186c1.223 1.868.563 4.303-1.262 5.916a1.353 1.353 0 0 0-.367 1.95c1.242 2.624.357 5.163-2.12 6.738a2.974 2.974 0 0 0-1.117 1.377a4.917 4.917 0 0 1-5.273 3.447a1.902 1.902 0 0 0-1.392.702c-1.422 1.967-3.278 2.355-5.31.918a1.115 1.115 0 0 0-1.553.008c-1.96 1.417-3.89 1.007-5.323-.942a1.925 1.925 0 0 0-1.408-.694a4.72 4.72 0 0 1-5.15-3.371a2.973 2.973 0 0 0-1.12-1.404c-2.651-1.652-3.51-4.269-2.082-7.063c.404-.79.174-1.099-.371-1.576a4.98 4.98 0 0 1-.162-7.77a1.32 1.32 0 0 0 .373-1.753c-1.134-2.796-.305-5.051 2.242-6.69a3.162 3.162 0 0 0 1.147-1.532a4.591 4.591 0 0 1 4.98-3.201a1.446 1.446 0 0 0 1.664-.79a3.38 3.38 0 0 1 5.09-.991a1.227 1.227 0 0 0 1.765.012c1.877-1.348 3.824-.89 5.212.99a2.048 2.048 0 0 0 1.505.73a4.864 4.864 0 0 1 5.183 3.558a3.24 3.24 0 0 0 1.283 1.416a5.234 5.234 0 0 1 2.462 4.828z"/>
        <path fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2" d="M36 18.461v37.084"/>
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M30.675 30.061s3.923-3.944 5.325 1.352"/>
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M41.325 30.061S37.402 26.117 36 31.413"/>
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M44.122 27.077s2.659-4.887-2.817-4.717"/>
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M41.325 42.9S37.402 46.846 36 41.55"/>
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M42.312 36.501s3.96-3.908 5.313 1.4"/>
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M30.675 42.9s3.923 3.945 5.325-1.35"/>
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M50.02 24.79s-1.258-1.334-5.298-1.009"/>
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M44.063 46.589s2.214 5.104-3.225 4.448"/>
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M49.98 49.317s-1.617 1.292-5.612.608"/>
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M28.085 27.077s-2.66-4.887 2.817-4.717"/>
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M29.2 36.501s-3.96-3.908-5.312 1.4"/>
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22.137 24.634s1.308-1.178 5.348-.853"/>
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M27.89 46.589s-2.214 5.104 3.225 4.448"/>
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21.973 49.317s1.617 1.292 5.612.608"/>
    </svg>
);

export const InstallIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}>
    <path d="M12 17V3" />
    <path d="m6 11 6 6 6-6" />
    <path d="M19 21H5" />
  </svg>
);