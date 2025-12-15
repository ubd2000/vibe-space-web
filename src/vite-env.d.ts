/// <reference types="vite/client" />

import React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                src?: string;
                poster?: string;
                alt?: string;
                "camera-controls"?: boolean;
                "auto-rotate"?: boolean;
                ar?: boolean;
                "ar-modes"?: string;
                style?: React.CSSProperties;
            };
        }
    }
}
