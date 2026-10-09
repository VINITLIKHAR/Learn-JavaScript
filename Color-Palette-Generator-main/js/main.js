// ============================================
// COLOR PALETTE GENERATOR - MAIN SCRIPT
// ============================================

// State Management
const appState = {
    currentPalette: [],
    savedPalettes: [],
    isDarkMode: localStorage.getItem('darkMode') === 'true'
};

// DOM Elements
const generateBtn = document.getElementById('generate-palette');
const savePaletteBtn = document.getElementById('save-palette');
const loadPaletteBtn = document.getElementById('load-palette');
const downloadPaletteBtn = document.getElementById('download-palette');
const downloadJsonBtn = document.getElementById('download-json');
const copyAllBtn = document.getElementById('copy-all');
const themeToggle = document.getElementById('theme-toggle');
const paletteMode = document.getElementById('palette-mode');
const paletteCount = document.getElementById('palette-count');
const colorPaletteDiv = document.getElementById('color-palette');
const savedPalettesList = document.getElementById('saved-palettes-list');
const loadingSpinner = document.getElementById('loading-spinner');

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Show toast notification
 */
function showToast(message, type = 'success', duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

/**
 * Show loading spinner
 */
function showSpinner(show = true) {
    loadingSpinner.classList.toggle('show', show);
}

/**
 * Convert RGB to Hex
 */
function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('').toUpperCase();
}

/**
 * Convert Hex to RGB
 */
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

/**
 * Generate random color
 */
function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
}

/**
 * Generate color name (simple approximation)
 */
function getColorName(hex) {
    const colorMap = {
        '#FF0000': 'Red',
        '#00FF00': 'Green',
        '#0000FF': 'Blue',
        '#FFFF00': 'Yellow',
        '#FF00FF': 'Magenta',
        '#00FFFF': 'Cyan',
        '#FFC0CB': 'Pink',
        '#FFA500': 'Orange',
        '#800080': 'Purple',
        '#FFC0CB': 'Pink',
        '#FFB6C1': 'Light Pink',
        '#800000': 'Maroon',
        '#808000': 'Olive',
        '#008000': 'Dark Green'
    };

    return colorMap[hex] || 'Custom Color';
}

/**
 * Get luminance of a color
 */
function getLuminance(hex) {
    const rgb = hexToRgb(hex);
    return (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
}

/**
 * Get contrasting text color
 */
function getContrastColor(hex) {
    return getLuminance(hex) > 0.5 ? '#000000' : '#FFFFFF';
}

// ============================================
// PALETTE GENERATION
// ============================================

/**
 * Generate random palette
 */
function generateRandomPalette(count) {
    return Array.from({ length: count }, () => getRandomColor());
}

/**
 * Generate pastel palette
 */
function generatePastelPalette(count) {
    return Array.from({ length: count }, () => {
        const hue = Math.random() * 360;
        const saturation = 70 + Math.random() * 20;
        const lightness = 70 + Math.random() * 20;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }).map(hsl => {
        const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        const h = parseInt(match[1]) / 360;
        const s = parseInt(match[2]) / 100;
        const l = parseInt(match[3]) / 100;

        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h * 6) % 2 - 1));
        const m = l - c / 2;

        let r, g, b;
        if (h < 1 / 6) [r, g, b] = [c, x, 0];
        else if (h < 2 / 6) [r, g, b] = [x, c, 0];
        else if (h < 3 / 6) [r, g, b] = [0, c, x];
        else if (h < 4 / 6) [r, g, b] = [0, x, c];
        else if (h < 5 / 6) [r, g, b] = [x, 0, c];
        else [r, g, b] = [c, 0, x];

        return rgbToHex(
            Math.round((r + m) * 255),
            Math.round((g + m) * 255),
            Math.round((b + m) * 255)
        );
    });
}

/**
 * Generate vibrant palette
 */
function generateVibrantPalette(count) {
    return Array.from({ length: count }, () => {
        const hue = Math.random() * 360;
        const saturation = 100;
        const lightness = 50;

        const c = (1 - Math.abs(2 * (lightness / 100) - 1)) * (saturation / 100);
        const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
        const m = (lightness / 100) - c / 2;

        let r, g, b;
        const h = hue / 60;
        if (h < 1) [r, g, b] = [c, x, 0];
        else if (h < 2) [r, g, b] = [x, c, 0];
        else if (h < 3) [r, g, b] = [0, c, x];
        else if (h < 4) [r, g, b] = [0, x, c];
        else if (h < 5) [r, g, b] = [x, 0, c];
        else [r, g, b] = [c, 0, x];

        return rgbToHex(
            Math.round((r + m) * 255),
            Math.round((g + m) * 255),
            Math.round((b + m) * 255)
        );
    });
}

/**
 * Generate dark palette
 */
function generateDarkPalette(count) {
    return Array.from({ length: count }, () => {
        const hue = Math.random() * 360;
        const saturation = 50 + Math.random() * 50;
        const lightness = 20 + Math.random() * 20;

        const c = (1 - Math.abs(2 * (lightness / 100) - 1)) * (saturation / 100);
        const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
        const m = (lightness / 100) - c / 2;

        let r, g, b;
        const h = hue / 60;
        if (h < 1) [r, g, b] = [c, x, 0];
        else if (h < 2) [r, g, b] = [x, c, 0];
        else if (h < 3) [r, g, b] = [0, c, x];
        else if (h < 4) [r, g, b] = [0, x, c];
        else if (h < 5) [r, g, b] = [x, 0, c];
        else [r, g, b] = [c, 0, x];

        return rgbToHex(
            Math.round((r + m) * 255),
            Math.round((g + m) * 255),
            Math.round((b + m) * 255)
        );
    });
}

/**
 * Generate light palette
 */
function generateLightPalette(count) {
    return Array.from({ length: count }, () => {
        const hue = Math.random() * 360;
        const saturation = 30 + Math.random() * 40;
        const lightness = 70 + Math.random() * 25;

        const c = (1 - Math.abs(2 * (lightness / 100) - 1)) * (saturation / 100);
        const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
        const m = (lightness / 100) - c / 2;

        let r, g, b;
        const h = hue / 60;
        if (h < 1) [r, g, b] = [c, x, 0];
        else if (h < 2) [r, g, b] = [x, c, 0];
        else if (h < 3) [r, g, b] = [0, c, x];
        else if (h < 4) [r, g, b] = [0, x, c];
        else if (h < 5) [r, g, b] = [x, 0, c];
        else [r, g, b] = [c, 0, x];

        return rgbToHex(
            Math.round((r + m) * 255),
            Math.round((g + m) * 255),
            Math.round((b + m) * 255)
        );
    });
}

/**
 * Generate palette based on mode
 */
function generatePalette() {
    const mode = paletteMode.value;
    const count = parseInt(paletteCount.value);

    if (count < 3 || count > 10) {
        showToast('Please select between 3 and 10 colors', 'warning');
        return;
    }

    let palette;
    switch (mode) {
        case 'pastel':
            palette = generatePastelPalette(count);
            break;
        case 'vibrant':
            palette = generateVibrantPalette(count);
            break;
        case 'dark':
            palette = generateDarkPalette(count);
            break;
        case 'light':
            palette = generateLightPalette(count);
            break;
        default:
            palette = generateRandomPalette(count);
    }

    appState.currentPalette = palette;
    displayPalette(palette);
    showToast('Palette generated successfully!');
}

// ============================================
// DISPLAY FUNCTIONS
// ============================================

/**
 * Display palette colors
 */
function displayPalette(colors) {
    colorPaletteDiv.innerHTML = '';

    colors.forEach((color, index) => {
        const colorBox = document.createElement('div');
        colorBox.className = 'color';
        colorBox.style.backgroundColor = color;

        const textColor = getContrastColor(color);

        colorBox.innerHTML = `
            <div class="color-copy-hint">Click to copy</div>
            <div class="color-info" style="color: ${textColor};">
                <p class="color-name">${getColorName(color)}</p>
                <p>${color}</p>
            </div>
        `;

        colorBox.addEventListener('click', () => copyToClipboard(color));
        colorPaletteDiv.appendChild(colorBox);
    });
}

// ============================================
// CLIPBOARD FUNCTIONS
// ============================================

/**
 * Copy color to clipboard
 */
function copyToClipboard(color) {
    navigator.clipboard.writeText(color).then(() => {
        showToast(`Copied: ${color}`);
    }).catch(() => {
        showToast('Failed to copy color', 'error');
    });
}

/**
 * Copy all colors to clipboard
 */
function copyAllToClipboard() {
    if (appState.currentPalette.length === 0) {
        showToast('Generate a palette first', 'warning');
        return;
    }

    const allColors = appState.currentPalette.join('\n');
    navigator.clipboard.writeText(allColors).then(() => {
        showToast('All colors copied to clipboard!');
    }).catch(() => {
        showToast('Failed to copy colors', 'error');
    });
}

// ============================================
// STORAGE FUNCTIONS
// ============================================

/**
 * Save current palette to local storage
 */
function savePalette() {
    if (appState.currentPalette.length === 0) {
        showToast('Generate a palette first', 'warning');
        return;
    }

    const timestamp = new Date().toLocaleString();
    const paletteData = {
        id: Date.now(),
        colors: appState.currentPalette,
        mode: paletteMode.value,
        createdAt: timestamp
    };

    appState.savedPalettes.push(paletteData);
    localStorage.setItem('savedPalettes', JSON.stringify(appState.savedPalettes));
    showToast('Palette saved successfully!', 'success');
    displaySavedPalettes();
}

/**
 * Load saved palettes from local storage
 */
function loadSavedPalettes() {
    const saved = localStorage.getItem('savedPalettes');
    appState.savedPalettes = saved ? JSON.parse(saved) : [];
    displaySavedPalettes();
}

/**
 * Display saved palettes
 */
function displaySavedPalettes() {
    savedPalettesList.innerHTML = '';

    if (appState.savedPalettes.length === 0) {
        savedPalettesList.innerHTML = '<div class="empty-message">No saved palettes yet. Create and save your first palette!</div>';
        return;
    }

    appState.savedPalettes.forEach(palette => {
        const paletteItem = document.createElement('div');
        paletteItem.className = 'saved-palette-item';

        const preview = document.createElement('div');
        preview.className = 'palette-preview';
        palette.colors.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'palette-color';
            colorDiv.style.backgroundColor = color;
            preview.appendChild(colorDiv);
        });

        const meta = document.createElement('div');
        meta.className = 'palette-meta';
        meta.innerHTML = `
            <p><strong>${palette.mode}</strong></p>
            <p>${palette.createdAt}</p>
            <button onclick="loadPaletteData(${palette.id})">Load</button>
            <button onclick="deletePalette(${palette.id})">Delete</button>
        `;

        paletteItem.appendChild(preview);
        paletteItem.appendChild(meta);
        savedPalettesList.appendChild(paletteItem);
    });
}

/**
 * Load palette data
 */
function loadPaletteData(id) {
    const palette = appState.savedPalettes.find(p => p.id === id);
    if (palette) {
        appState.currentPalette = palette.colors;
        paletteMode.value = palette.mode;
        displayPalette(palette.colors);
        showToast('Palette loaded successfully!');
    }
}

/**
 * Delete saved palette
 */
function deletePalette(id) {
    if (confirm('Are you sure you want to delete this palette?')) {
        appState.savedPalettes = appState.savedPalettes.filter(p => p.id !== id);
        localStorage.setItem('savedPalettes', JSON.stringify(appState.savedPalettes));
        displaySavedPalettes();
        showToast('Palette deleted!');
    }
}

// ============================================
// EXPORT FUNCTIONS
// ============================================

/**
 * Download palette as PNG
 */
function downloadPaletteAsImage() {
    if (appState.currentPalette.length === 0) {
        showToast('Generate a palette first', 'warning');
        return;
    }

    showSpinner(true);

    html2canvas(colorPaletteDiv, {
        scale: 2,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `palette-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
        showToast('Palette downloaded as PNG!');
        showSpinner(false);
    }).catch(() => {
        showToast('Failed to download palette', 'error');
        showSpinner(false);
    });
}

/**
 * Export palette as JSON
 */
function exportPaletteAsJSON() {
    if (appState.currentPalette.length === 0) {
        showToast('Generate a palette first', 'warning');
        return;
    }

    const data = {
        palette: appState.currentPalette,
        mode: paletteMode.value,
        count: appState.currentPalette.length,
        createdAt: new Date().toISOString()
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `palette-${Date.now()}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Palette exported as JSON!');
}

// ============================================
// THEME TOGGLE
// ============================================

/**
 * Toggle dark mode
 */
function toggleDarkMode() {
    appState.isDarkMode = !appState.isDarkMode;
    document.body.classList.toggle('dark-mode', appState.isDarkMode);
    localStorage.setItem('darkMode', appState.isDarkMode);

    const icon = themeToggle.querySelector('i');
    icon.className = appState.isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
}

// ============================================
// EVENT LISTENERS
// ============================================

generateBtn.addEventListener('click', generatePalette);
savePaletteBtn.addEventListener('click', savePalette);
loadPaletteBtn.addEventListener('click', loadSavedPalettes);
downloadPaletteBtn.addEventListener('click', downloadPaletteAsImage);
downloadJsonBtn.addEventListener('click', exportPaletteAsJSON);
copyAllBtn.addEventListener('click', copyAllToClipboard);
themeToggle.addEventListener('click', toggleDarkMode);

paletteMode.addEventListener('change', generatePalette);
paletteCount.addEventListener('change', generatePalette);

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + G: Generate palette
    if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
        e.preventDefault();
        generatePalette();
    }
    // Ctrl/Cmd + S: Save palette
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        savePalette();
    }
    // Ctrl/Cmd + D: Download palette
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        downloadPaletteAsImage();
    }
});

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize dark mode
    if (appState.isDarkMode) {
        document.body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.className = 'fas fa-sun';
    }

    // Load saved palettes
    loadSavedPalettes();

    // Generate initial palette
    generatePalette();
});