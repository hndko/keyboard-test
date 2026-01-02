// Helper to create spacer
const spacer = (width) => ({ width, type: "spacer" });

export const keys = [
  // Row 1: Function Row + Nav Cluster Top
  [
    { code: "Escape", label: "Esc", width: 1 },
    spacer(1),
    { code: "F1", label: "F1", width: 1 },
    { code: "F2", label: "F2", width: 1 },
    { code: "F3", label: "F3", width: 1 },
    { code: "F4", label: "F4", width: 1 },
    spacer(0.5),
    { code: "F5", label: "F5", width: 1 },
    { code: "F6", label: "F6", width: 1 },
    { code: "F7", label: "F7", width: 1 },
    { code: "F8", label: "F8", width: 1 },
    spacer(0.5),
    { code: "F9", label: "F9", width: 1 },
    { code: "F10", label: "F10", width: 1 },
    { code: "F11", label: "F11", width: 1 },
    { code: "F12", label: "F12", width: 1 },
    spacer(0.5),
    { code: "PrintScreen", label: "PrtSc", width: 1 },
    { code: "ScrollLock", label: "ScrLk", width: 1 },
    { code: "Pause", label: "Pause", width: 1 },
    spacer(0.5),
    // Numpad Row 1 (optional, usually empty above numpad or media keys. let's leave empty for standard)
  ],
  // Row 2: Numbers + Nav Cluster (Ins/Home/PgUp) + Numpad (Num/Div/Mul/Sub)
  [
    { code: "Backquote", label: "`", labelShift: "~", width: 1 },
    { code: "Digit1", label: "1", labelShift: "!", width: 1 },
    { code: "Digit2", label: "2", labelShift: "@", width: 1 },
    { code: "Digit3", label: "3", labelShift: "#", width: 1 },
    { code: "Digit4", label: "4", labelShift: "$", width: 1 },
    { code: "Digit5", label: "5", labelShift: "%", width: 1 },
    { code: "Digit6", label: "6", labelShift: "^", width: 1 },
    { code: "Digit7", label: "7", labelShift: "&", width: 1 },
    { code: "Digit8", label: "8", labelShift: "*", width: 1 },
    { code: "Digit9", label: "9", labelShift: "(", width: 1 },
    { code: "Digit0", label: "0", labelShift: ")", width: 1 },
    { code: "Minus", label: "-", labelShift: "_", width: 1 },
    { code: "Equal", label: "=", labelShift: "+", width: 1 },
    { code: "Backspace", label: "Backspace", width: 2, align: "right" },
    spacer(0.5),
    { code: "Insert", label: "Ins", width: 1 },
    { code: "Home", label: "Home", width: 1 },
    { code: "PageUp", label: "PgUp", width: 1 },
    spacer(0.5),
    { code: "NumLock", label: "Num", width: 1 },
    { code: "NumpadDivide", label: "/", width: 1 },
    { code: "NumpadMultiply", label: "*", width: 1 },
    { code: "NumpadSubtract", label: "-", width: 1 },
  ],
  // Row 3: Tab/QWERTY + Nav (Del/End/PgDn) + Numpad (7/8/9/Add)
  [
    { code: "Tab", label: "Tab", width: 1.5 },
    { code: "KeyQ", label: "Q", width: 1 },
    { code: "KeyW", label: "W", width: 1 },
    { code: "KeyE", label: "E", width: 1 },
    { code: "KeyR", label: "R", width: 1 },
    { code: "KeyT", label: "T", width: 1 },
    { code: "KeyY", label: "Y", width: 1 },
    { code: "KeyU", label: "U", width: 1 },
    { code: "KeyI", label: "I", width: 1 },
    { code: "KeyO", label: "O", width: 1 },
    { code: "KeyP", label: "P", width: 1 },
    { code: "BracketLeft", label: "[", labelShift: "{", width: 1 },
    { code: "BracketRight", label: "]", labelShift: "}", width: 1 },
    { code: "Backslash", label: "\\", labelShift: "|", width: 1.5 },
    spacer(0.5),
    { code: "Delete", label: "Del", width: 1 },
    { code: "End", label: "End", width: 1 },
    { code: "PageDown", label: "PgDn", width: 1 },
    spacer(0.5),
    { code: "Numpad7", label: "7", width: 1 },
    { code: "Numpad8", label: "8", width: 1 },
    { code: "Numpad9", label: "9", width: 1 },
    { code: "NumpadAdd", label: "+", width: 1 }, // Note: Plus is usually height 2, but in row-based, we might need to be tricky.
    // Standard row approach: Numpad + spans 2 rows.
    // To keep it simple for this "grid" system without rowspan complexity, we'll cheat or keep it single row for now, OR:
    // We can say NumpadAdd is in this row, and next row has a "spacer" or "continuation".
    // Actually, making it 1u height for now is safer for a "Simple" generic grid, or I make the row height adjustable.
    // Let's stick to standard single height keys for simplicity unless requested "perfect" physical layout.
    // Wait, "Perfect" is better. But RowSpan in flex is hard.
    // Let's just make + and Enter standard 1u tall for now to avoid breaking the grid, or just realize that Numpad+ takes 2 slots in a generic grid unless using CSS Grid.
    // Let's stick to 1u height for visual simplicity/consistency first.
  ],
  // Row 4: Caps/ASDF + Empty + Numpad (4/5/6)
  [
    { code: "CapsLock", label: "Caps", width: 1.75 },
    { code: "KeyA", label: "A", width: 1 },
    { code: "KeyS", label: "S", width: 1 },
    { code: "KeyD", label: "D", width: 1 },
    { code: "KeyF", label: "F", width: 1 },
    { code: "KeyG", label: "G", width: 1 },
    { code: "KeyH", label: "H", width: 1 },
    { code: "KeyJ", label: "J", width: 1 },
    { code: "KeyK", label: "K", width: 1 },
    { code: "KeyL", label: "L", width: 1 },
    { code: "Semicolon", label: ";", labelShift: ":", width: 1 },
    { code: "Quote", label: "'", labelShift: '"', width: 1 },
    { code: "Enter", label: "Enter", width: 2.25 },
    spacer(0.5),
    spacer(1),
    spacer(1),
    spacer(1), // Empty space where Nav usually are
    spacer(0.5),
    { code: "Numpad4", label: "4", width: 1 },
    { code: "Numpad5", label: "5", width: 1 },
    { code: "Numpad6", label: "6", width: 1 },
    { code: "NumpadAdd", label: "+", width: 1, invisible: true }, // Fake key for spacing if we did rowspan, but since we didn't, we repeat or omit.
    // Actually let's put NumpadAdd in Row 3 and make it tall? No, CSS Grid is needed for that.
    // I will put NumpadAdd in Row 3, and here I put a spacer? No, that leaves a hole.
    // I will just put the same NumpadAdd code here? No duplicate keys?
    // Let's just render standard 1u keys for Numpad +, Enter, 0 for now to ensure it works.
  ],
  // Row 5: Shift/ZXCV + Arrow Up + Numpad (1/2/3/Enter)
  [
    { code: "ShiftLeft", label: "Shift", width: 2.25 },
    { code: "KeyZ", label: "Z", width: 1 },
    { code: "KeyX", label: "X", width: 1 },
    { code: "KeyC", label: "C", width: 1 },
    { code: "KeyV", label: "V", width: 1 },
    { code: "KeyB", label: "B", width: 1 },
    { code: "KeyN", label: "N", width: 1 },
    { code: "KeyM", label: "M", width: 1 },
    { code: "Comma", label: ",", labelShift: "<", width: 1 },
    { code: "Period", label: ".", labelShift: ">", width: 1 },
    { code: "Slash", label: "/", labelShift: "?", width: 1 },
    { code: "ShiftRight", label: "Shift", width: 2.75 },
    spacer(0.5),
    spacer(1),
    { code: "ArrowUp", label: "↑", width: 1 },
    spacer(1),
    spacer(0.5),
    { code: "Numpad1", label: "1", width: 1 },
    { code: "Numpad2", label: "2", width: 1 },
    { code: "Numpad3", label: "3", width: 1 },
    { code: "NumpadEnter", label: "Ent", width: 1 },
  ],
  // Row 6: Mods + Space + Arrows (Left/Down/Right) + Numpad (0/.)
  [
    { code: "ControlLeft", label: "Ctrl", width: 1.25 },
    { code: "MetaLeft", label: "Win", labelMac: "Cmd", width: 1.25 },
    { code: "AltLeft", label: "Alt", labelMac: "Opt", width: 1.25 },
    { code: "Space", label: "", width: 6.25 },
    { code: "AltRight", label: "Alt", labelMac: "Opt", width: 1.25 },
    { code: "MetaRight", label: "Win", labelMac: "Cmd", width: 1.25 },
    { code: "ContextMenu", label: "Menu", width: 1.25 },
    { code: "ControlRight", label: "Ctrl", width: 1.25 },
    spacer(0.5),
    { code: "ArrowLeft", label: "←", width: 1 },
    { code: "ArrowDown", label: "↓", width: 1 },
    { code: "ArrowRight", label: "→", width: 1 },
    spacer(0.5),
    { code: "Numpad0", label: "0", width: 2 },
    { code: "NumpadDecimal", label: ".", width: 1 },
    { code: "NumpadEnter", label: "", width: 1, invisible: true },
  ],
];

export const arrowKeys = [];
