import * as React from 'react';

function SvgDefaultProfilePicture(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 1200"
            {...props}
        >
            <defs>
                <style>
                    {'.defaultProfilePicture_svg__cls-2{fill:#7483ff}'}
                </style>
            </defs>
            <g id="defaultProfilePicture_svg__Layer_2" data-name="Layer 2">
                <g
                    id="defaultProfilePicture_svg__Layer_1-2"
                    data-name="Layer 1"
                >
                    <path
                        d="M1200 0H0v1200h388.53C321.4 1145.83 279 1066.31 279 977.66c0-163.23 143.72-295.56 321-295.56s321 132.33 321 295.56c0 88.65-42.4 168.17-109.53 222.34H1200z"
                        fill="#fffff4"
                    />
                    <path
                        className="defaultProfilePicture_svg__cls-2"
                        d="M921 977.66c0-163.23-143.72-295.56-321-295.56S279 814.43 279 977.66c0 88.65 42.4 168.17 109.53 222.34h422.94C878.6 1145.83 921 1066.31 921 977.66z"
                    />
                    <circle
                        className="defaultProfilePicture_svg__cls-2"
                        cx={600}
                        cy={456.03}
                        r={172.24}
                    />
                </g>
            </g>
        </svg>
    );
}

export default SvgDefaultProfilePicture;
