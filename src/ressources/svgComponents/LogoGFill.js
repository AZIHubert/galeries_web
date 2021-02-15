import * as React from 'react';

function SvgLogoGFill(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 106.04 120.14"
            {...props}
        >
            <defs>
                <linearGradient
                    id="logoGFill_svg__a"
                    x1={9.21}
                    y1={10.65}
                    x2={107.21}
                    y2={108.65}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset={0} stopColor="#23f2ff" />
                    <stop offset={0.15} stopColor="#2ae9ff" />
                    <stop offset={0.39} stopColor="#3ccfff" />
                    <stop offset={0.7} stopColor="#5aa6ff" />
                    <stop offset={0.99} stopColor="#7b78ff" />
                </linearGradient>
                <linearGradient
                    id="logoGFill_svg__b"
                    x1={17.32}
                    y1={7.54}
                    x2={115.32}
                    y2={105.54}
                    xlinkHref="#logoGFill_svg__a"
                />
            </defs>
            <g data-name="Layer 2">
                <g data-name="Layer 1">
                    <path
                        d="M0 48c0 26.49 23.09 48 51.58 48a54.94 54.94 0 0014.22-1.91V1.85A55.37 55.37 0 0051.58 0C23.09 0 0 21.48 0 48z"
                        fill="url(#logoGFill_svg__a)"
                    />
                    <path
                        fill="url(#logoGFill_svg__b)"
                        d="M77.59 52.43v67.71l28.44-4.25V43.94l-28.44 8.49z"
                    />
                </g>
            </g>
        </svg>
    );
}

export default SvgLogoGFill;
