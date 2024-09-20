document.addEventListener('DOMContentLoaded', () => {
    const colorInput = document.getElementById('colorInput');
    const colorPicker = document.getElementById('colorPicker');
    const colorName = document.getElementById('colorName');
    const colorHex = document.getElementById('colorHex');
    const colorRGB = document.getElementById('colorRGB');
    const colorHSL = document.getElementById('colorHSL');
    const colorCMYK = document.getElementById('colorCMYK');

    const updateColor = (color) => {
        const hex = colorToHex(color);
        const rgb = hexToRgb(hex);
        const hsl = rgbToHsl(rgb);
        const cmyk = rgbToCmyk(rgb);

        colorName.textContent = color;
        colorHex.textContent = hex;
        colorRGB.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        colorHSL.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        colorCMYK.textContent = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
    };

    colorInput.addEventListener('input', () => {
        updateColor(colorInput.value);
    });

    colorPicker.addEventListener('input', () => {
        updateColor(colorPicker.value);
    });

    const colorToHex = (color) => {
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            return color;
        }
        const tempElem = document.createElement('div');
        tempElem.style.color = color;
        document.body.appendChild(tempElem);
        const computedColor = getComputedStyle(tempElem).color;
        document.body.removeChild(tempElem);
        return rgbToHex(computedColor);
    };

    const rgbToHex = (rgb) => {
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    };

    const hexToRgb = (hex) => {
        const bigint = parseInt(hex.slice(1), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    };

    const rgbToHsl = ({ r, g, b }) => {
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const h = max === min ? 0 :
            max === r ? (60 * ((g - b) / (max - min)) + 360) % 360 :
            max === g ? (60 * ((b - r) / (max - min)) + 120) :
            (60 * ((r - g) / (max - min)) + 240);
        const l = (max + min) / 2;
        const s = max === min ? 0 : (max - min) / (1 - Math.abs(2 * l - 1));
        return {
            h: Math.round(h),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    };

    const rgbToCmyk = ({ r, g, b }) => {
        const c = 1 - r / 255;
        const m = 1 - g / 255;
        const y = 1 - b / 255;
        const k = Math.min(c, Math.min(m, y));
        return {
            c: Math.round((c - k) / (1 - k) * 100),
            m: Math.round((m - k) / (1 - k) * 100),
            y: Math.round((y - k) / (1 - k) * 100),
            k: Math.round(k * 100)
        };
    };
});








